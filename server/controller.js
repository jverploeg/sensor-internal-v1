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
  //console.log(req.url)
  let route = req.url.slice(8);
  console.log(route)
  //split route into folder and filenames
  route = route.split('/');
  let folder = route[0];
  let fileName = route[1];
  console.log({folder, fileName})

  //set filepath
  var package = '';
  if(folder === 'type'){
    package = `${filepath}/${folder}/Type-${fileName}-Model.png`;
  } else if(folder === 'mech'){
    package = `${filepath}/${folder}/${fileName}-Mech-Model.png`;
   } 
//else if(folder === 'housing'){
//     package = `${filepath}/${folder}/${fileName}-Model.png`;
//   } else if(folder === 'option'){
//     package = `${filepath}/${folder}/${fileName}-Model.png`;
//   } else if(folder === 'connect'){
//     package = `${filepath}/${folder}/${fileName}-Model.png`;
//   } else if(folder === 'conn_charts'){
//       //logic to split...
//       //conn_charts/${connect}-${char}-Model.png
//     package = `${filepath}/${folder}/${fileName}-Model.png`;
//   } else if(folder === 'spec_charts'){
//       //
//       //spec_charts/${char}-${option}-Model.png
//     package = `${filepath}/${folder}/Type-${fileName}-Model.png`;
//   } else if(folder === 'pictures'){
//       //logic to split...
//       //pictures/${housing}-${char}-Model.png
//     package = `${filepath}/${folder}/Type-${fileName}-Model.png`;
//   }
  
  console.log({package})

  //send file back to client
  res.sendFile(package, (err) => {
    if(err) {
      console.log(err);
    } else {
      console.log('SENT: ', package);
    }
  });

}  

/*
<img className="type" src={require(`D:/DATA/Sensor/webApp/images/type/Type-${type}-Model.png`).default}></img>
<img className="mech" src={require(`D:/DATA/Sensor/webApp/images/mech/${housing}-Mech-Model.png`).default}></img>
<img className="housing" src={require(`D:/DATA/Sensor/webApp/images/housing/${housing}-Model.png`).default}></img>
<img className="option" src={require(`D:/DATA/Sensor/webApp/images/option/${option}-Model.png`).default}></img>
<img className="conn" src={require(`D:/DATA/Sensor/webApp/images/connect/${connect}-Model.png`).default}></img>
<img className="conn_chart" src={require(`D:/DATA/Sensor/webApp/images/conn_charts/${connect}-${char}-Model.png`).default}></img>
<img className="spec_chart" src={require(`D:/DATA/Sensor/webApp/images/spec_charts/${char}-${option}-Model.png`).default}></img>
<img className="picture" src={require(`D:/DATA/Sensor/webApp/images/pictures/${housing}-${char}-Model.png`).default}></img>
*/
  //split logic
//   let folder = route.slice(0,4);
//   let fileName = route.slice(4);
//   console.log(route)
  // let temp = req.query;
  // let folder = Object.keys(temp);
  // let fileName = temp[folder];
//   console.log({route, folder, fileName})
//   let package = `${filepath}/${folder}/Type-${fileName}-Model.png`;
//   console.log({package})
//   //res.type('png')?
//   res.sendFile(package, (err) => {
//     if(err) {
//       console.log(err);
//       //next(err);
//     } else {
//       console.log('SENT: ', package);
//     }
//   });


module.exports = {
    getData,
    addData,
    changeData,
    getSensor,
    getType,
    getCustom,
    getImage

}