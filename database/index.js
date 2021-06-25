// connecting node.js to the PostgreSQL server
// pg pool setup to connect to database
// store login credentials in config file so they aren't pushed up

// import libraries
const { Pool, Client } = require('pg');
// Client - one connection to the database.
// Pool - multiple Client
// Pool allows you to do several in parallel (independent from each other) queries

// import dependencies
//const login = require('./config');
const login = require('./config2');

// create an instance of a pool
const pool = new Pool({
    host: login.host,
    user: login.user,
    password: login.password,
    database: login.database,
    port: login.port,
})

pool.connect((err, client, release) => {
    if (err) {
      return console.error('Error acquiring client', err.stack)
    }
    client.query('SELECT NOW()', (err, result) => {
      release()
      if (err) {
        return console.error('Error executing query', err.stack)
      }
      console.log(result.rows)
    })
})
module.exports = pool;

// module.exports = {
//     query: (text, params, callback) => {
//       return pool.query(text, params, callback)
//     },
// }

/*

pool.query('SELECT NOW()', (err, res) => {
    console.log(err, res)
    pool.end()
})


const client = new Client({
    host: login.host,
    user: login.user,
    password: login.password,
    database: login.database,
    port: login.port,
})

client.connect();

client.query('SELECT NOW()', (err, res) => {
    console.log(err, res)
    client.end()
})




// //you can supply a custom client constructor
// //if you want to use the native postgres client
// var NativeClient = require('pg').native.Client
// var nativePool = new Pool({ Client: NativeClient })

// //you can even pool pg-native clients directly
// var PgNativeClient = require('pg-native')
// var pgNativePool = new Pool({ Client: PgNativeClient })


*/