// import/declare dependencies
const express = require('express');
const path = require('path');
const cors = require('cors');

// define server
// app object conventionally denotes the Express application
const app = express();

// render static files
app.use(express.static(path.resolve(__dirname, '..', 'src', 'dist')));


// setup any middleware
app.use(express.json());
app.use(cors());

// set port
const port = 3000;

// connect server
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

// *************ROUTES****************

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


