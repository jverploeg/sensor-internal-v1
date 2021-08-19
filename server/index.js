// FUNCTIONAL DEPENDENCIES
const express = require('express');
const path = require('path');
const cors = require('cors');

// HELPER FUNCTIONS/FILES
const route = require('./controller');

/////////////SETUP/////////////////////

// define server
const app = express();

// render static files
app.use(express.static(path.resolve(__dirname, '..', 'dist')));

// setup middleware for parsing
app.use(express.json());
app.use(cors());

// set port
const port = 3000;

// connect server
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
////////////////////////////////////////

////////////ROUTES//////////////////////

//HOUSING
app.get('/housing', route.getData);
app.post('/housing', route.addData);
app.put('/housing', route.changeData);
app.delete('/housing/*', route.deleteRow);

//CHAR
app.get('/char', route.getData);
app.post('/char', route.addData);
app.put('/char', route.changeData);
app.delete('/char/*', route.deleteRow);

//OPTION
app.get('/option', route.getData);
app.post('/option', route.addData);
app.put('/option', route.changeData);
app.delete('/option/*', route.deleteRow);

//char_op
app.get('/char_op', route.getData);
app.post('/char_op', route.addData);
app.put('/char_op', route.changeData);
app.delete('/char_op/*', route.deleteRow);

//CONNECTION
// rename to conn?
app.get('/connection', route.getData);
app.post('/connection', route.addData);
app.put('/connection', route.changeData);
app.delete('/connection/*', route.deleteRow);

////////////////////////////////////////////////////////////////////////
//SENSORS
app.get('/sensor', route.getData);//for displaying sensors in the table selections
app.post('/sensor', route.addData);
app.put('/sensor', route.changeData);
app.delete('/sensor/*', route.deleteRow);

app.get('/custom', route.getData);//for displaying sensors in the table selections
app.post('/custom', route.addData);
app.put('/custom', route.changeData);
app.delete('/custom/*', route.deleteRow);

app.get('/xproto', route.getData);//for displaying sensors in the table selections
app.post('/xproto', route.addData);
app.put('/xproto', route.changeData);
app.delete('/xproto/*', route.deleteRow);

////VALID SENSOR////////
app.get('/valid/*', route.checkSensor);

///////SENSOR DATA//////////////////
app.get('/sensor/*', route.getSensor);
app.get('/type', route.getType); //for the type description at the top of the pdf

app.get('/custom/*', route.getCustom);
app.get('/ctype/*', route.getCustomType);//need options for image selection

app.get('/proto/*', route.getProto);
app.get('/ptype/*', route.getProtoType);//need options for image selection


//IMAGES
app.get('/images/*', route.getImage);

//HTML
app.get('/html/bullets/*', route.getBullets);
app.get('/html/description/*', route.getHTML);