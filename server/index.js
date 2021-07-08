// import/declare dependencies
const express = require('express');
const path = require('path');
const cors = require('cors');

// define server
// app object conventionally denotes the Express application
const app = express();

// render static files
app.use(express.static(path.resolve(__dirname, '..', 'src', 'dist')));

//local files
//app.use('/images', express.static('file:///D:/DATA/Sensor/webApp/images'))
//https://www.geeksforgeeks.org/how-to-fetch-images-from-node-server/

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
//app.listen(port, '192.168.1.118', () => {
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

//app.get('/images', route.getImage);
////////////ROUTES//////////////////////
//HOUSING
app.get('/housing', route.getData);
app.post('/housing', route.addData);
app.put('/housing', route.changeData);
//CHAR
app.get('/char', route.getData);
app.post('/char', route.addData);
app.put('/char', route.changeData);
//OPTION
app.get('/option', route.getData);
app.post('/option', route.addData);
app.put('/option', route.changeData);
//char_op
app.get('/char_op', route.getData);
app.post('/char_op', route.addData);
app.put('/char_op', route.changeData);
//CONNECTION
// rename to conn?
app.get('/connection', route.getData);
app.post('/connection', route.addData);
app.put('/connection', route.changeData);

app.get('/sensor', route.getData);//for displaying sensors in the table selections
app.get('/custom', route.getData);//for displaying sensors in the table selections
app.get('/xproto', route.getData);//for displaying sensors in the table selections
////VALID SENSOR////////
// app.get('/sensor', route.getData);//for displaying sensors in the table selections
// app.get('/custom', route.getData);//for displaying sensors in the table selections
// app.get('/xproto', route.getData);//for displaying sensors in the table selections

app.get('/sensorValid', route.getSensor); //index.js
app.get('/custom', route.getCustom);





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


