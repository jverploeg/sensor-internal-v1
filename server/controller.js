// CONNECT TO THE DATABASE
const db = require('../database/model.js');


//ADAPTIVE FUNCTIONS THAT WORK FOR ANY TABLE//
const getData = (req, res) => {
    //remove the / from the req.url
    let route = req.url.slice(1); // '/route' --> 'route'
    db.getData(route)
    .then(result => {
        res.status(200).send(result.rows);
    })
    .catch(error => {
        res.status(500).send(error)
    })
}

const addData = (req, res) => {
    //remove the / from the req.url
    let route = req.url.slice(1); // '/route' --> 'route'
    const entry = req.body;
    let keys = Object.keys(entry);
    let values = Object.values(entry);

    db.addData(route, keys, values)
    .then(result => {
        res.status(200).send(result.rows);
    })
    .catch(error => {
        res.status(500).send(error)
    })
}

const changeData = (req, res) => {
    //remove the / from the req.url
    let route = req.url.slice(1); // '/route' --> 'route'
    const entry = req.body;

    db.changeData(route, entry)
    .then(result => {
        res.status(200).send(result.rows);
    })
    .catch(error => {
        res.status(500).send(error)
    })
}
const deleteRow = (req, res) => {
    //remove the / from the req.url
    let route = req.url.slice(1); // '/route' --> 'route/id'
    let data = route.split('/');
    let path = data[0];
    let id = data[1];


    db.deleteRow(path, id)
    .then(result => {
        res.status(200).send(result.rows);
    })
    .catch(error => {
        res.status(500).send(error)
    })
}

const checkSensor = (req, res) => {
    let pathway = req.url.slice(7); // /valid/ 7
    //get type and code;
    let data = pathway.split('/');
    let type = data[0];
    let sensor = data[1];
    if(type === 'catalog'){
        db.sensorExists(sensor)    
        .then(result => {
            res.send(result);
        })
        .catch(error => {
            res.status(500).send(error)
        })
    } else if(type === 'custom'){
        db.customExists(sensor)   
        .then(result => {
            res.send(result);
        })
        .catch(error => {
            res.status(500).send(error)
        })
    }
}

const getSensor = (req, res) => {
    let sensor = req.url.slice(8);
    db.getSensor(sensor)
    .then(result => {
        res.status(200).send(result.rows);
    })
    .catch(error => {
        res.status(500).send(error)
    })
}

const getType = (req, res) => {
    let data = req.query.type;
    db.getType(data)
    .then(result => {
        res.status(200).send(result.rows);
    })
    .catch(error => {
        res.status(500).send(error);
    })
}

const getCustom = (req, res) => {
    let sensor = req.url.slice(8);
    db.getCustom(sensor)
    .then(result => {
        res.status(200).send(result.rows);
    })
    .catch(error => {
        res.status(500).send(error)
    })
}
const getCustomType = (req, res) => {
    let sensor = req.url.slice(7);
    db.getCustomType(sensor)
    .then(result => {
        res.status(200).send(result.rows);
    })
    .catch(error => {
        res.status(500).send(error)
    })
}


const getImage = (req, res) => {
  let filepath = `D:/DATA/Sensor/webApp/images`;
  let route = req.url.slice(8);
  //combine Absolute path to local storage with endpoint
  let package = `${filepath}/${route}.png`;
  //send image file to client
  res.sendFile(package);
}  
//require(`D:/DATA/Sensor/webApp/images/pdf_bullets/${file1}.html`).default;
const getBullets = (req, res) => {
    let folder = `D:/DATA/Sensor/webApp/images/pdf_bullets/`;
    let file = req.url.slice(14);
      //combine Absolute path to local storage with endpoint
    let package = `${folder}/${file}.html`;
    res.sendFile(package);
}
//require(`D:/DATA/Sensor/webApp/images/descriptions/${file1}.html`)
const getHTML = (req, res) => {
    let folder = `D:/DATA/Sensor/webApp/images/descriptions/`;
    let file = req.url.slice(17);
      //combine Absolute path to local storage with endpoint
    let package = `${folder}/${file}.html`;
    res.sendFile(package);
}


module.exports = {
    getData,
    addData,
    changeData,
    deleteRow,
    checkSensor,
    getSensor,
    getType,
    getCustom,
    getCustomType,
    getImage,

    getBullets,
    getHTML,
}