const db = require('../database/model.js');

//ADAPTIVE FUNCTIONS THAT WORK FOR ANY TABLE//
const getData = (req, res) => {
    //remove the / from the req.url
    let route = req.url.slice(1); // '/route' --> 'route'
    console.log({route})
    db.getData(route)
    .then(result => {
        res.status(200).send(result.rows);
    })
    .catch(error => {
        res.status(500).send(error)
    })
}
const addData = (req, res) => {
    //get path
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
    //get path
    //remove the / from the req.url
    let route = req.url.slice(1); // '/route' --> 'route'
    const entry = req.body;
    let id = entry.id;
    let col = entry.field;
    let val = entry.props.value;
    //console.log({id, col, val})
    let values = [id, col, val];
    db.changeData(route, values)
    .then(result => {
        res.status(200).send(result.rows);
    })
    .catch(error => {
        res.status(500).send(error)
    })
}

const getSensor = (req, res) => {
    let data = req.query.sensor; //define what the sensor number is from the axios request
    db.getSensor(data)
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
    console.log(req.body)
    let data = ''; //define what this is later
    db.getCustom(data)
    .then(result => {
        res.status(200).send(result.rows);
    })
    .catch(error => {
        res.status(500).send(error)
    })
}

let filepath = `D:/DATA/Sensor/webApp/images`;
const getImage = (req, res) => {
    //set basepath
  //let filepath = `D:/DATA/Sensor/webApp/images`;
  //get images/folder/filename.png from client request
  let route = req.url.slice(8);
  //combine Absolute path to local storage with endpoint
  let package = `${filepath}/${route}.png`;
  console.log({package})

  res.sendFile(package, (err) => {
      //ignore these messages for now
    // if(err) {
    //   console.log(err);
    // } else {
    //   console.log('SENT: ', package);
    // }
  });

}  


module.exports = {
    getData,
    addData,
    changeData,
    getSensor,
    getType,
    getCustom,
    getImage

}