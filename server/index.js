// import/declare dependencies
const express = require('express');
const path = require('path');
const cors = require('cors');

// define server
// app object conventionally denotes the Express application
const app = express();

// render static files
app.use(express.static(path.resolve(__dirname, '..', 'src', 'dist')));


// setup middleware for parsing
app.use(express.json());
app.use(cors());
//Configure cors so other computers can access 
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

// import controller functions
const route = require('./controller');
// link to the database pool
const db = require('../database/index');

// set port
const port = 3000;

// connect server
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

////////////ROUTES//////////////////////

//CHAR
app.get('/char', route.getData);
app.post('/char', route.addData);
app.put('/char', route.changeData);

//HOUSING
app.get('/housing', route.getData);
app.post('/housing', route.addData);
app.put('/housing', route.changeData);







// *************ROUTES****************
// GET for the tables
// sample query to test our communication logic between server, db, cient
// app.get('/sample', (req, res, next) => {
//   db.query('SELECT * FROM sample', [req.params.id], (err, res) => {
//     if (err) {
//       return next(err)
//     }
//     res.send(res.rows[0])
//   })
// })
//READ, INSERT, UPDATE, DELETE
// app.get('/sample', route.getData);
// app.post('/sample', route.addSample);
// app.put('/sample', route.changeSample);
// // app.delete('/sample', route.deleteSample);
// app.get('/headers', route.getHeaders);



//template (CRUD -> get, post, delete, update)
// app.get('path', (request, response) => {
//     const params = request.params;
//     //call controller helper
//     controller.name(arguments)
//         .then((results) => {
//             return res.status(200).send(results);
//         })
//         .catch((error) => {
//             return res.status(400).send(error);
//         });
// })


