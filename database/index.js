// connecting node.js to the PostgreSQL server
// pg pool setup to connect to database
// store login credentials in config file so they aren't pushed up

// import libraries
const { Pool, Client } = require('pg');
// Client - one connection to the database.
// Pool - multiple Client
// Pool allows you to do several in parallel (independent from each other) queries

// import dependencies
const login = require('./config');//config credentials are hidden

// create an instance of a pool
const pool = new Pool({
    host: login.host,
    user: login.user,
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