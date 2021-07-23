// import/declare dependencies
const express = require('express');
const path = require('path');
const cors = require('cors');

// define server
// app object conventionally denotes the Express application
const app = express();

// render static files
app.use(express.static(path.resolve(__dirname, '..', 'dist')));


// setup middleware for parsing
app.use(express.json());
app.use(cors());
//Configure cors so other computers can access 

//Needed????
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//   res.setHeader('Access-Control-Allow-Credentials', true);
//   next();
// });

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
app.get('/sensor/*', route.getSensor);
app.get('/type', route.getType); //for the type description at the top of the pdf

app.get('/custom/*', route.getCustom);
//app.get('/custom/type', route.getCustomType);!!!!!!!!!!!!!!!You cant call subfolders if a wildcard has already been defined!!!!!!!!!!!!!!!!
app.get('/ctype/*', route.getCustomType);//need options for image selection


//get images for pdf
app.get('/images/*', route.getImage);


