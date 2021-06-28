const db = require('../database/model.js');


// const getSample = async(req, res) => {
//     try {
//         const data = await db.getSample(req.params);
//         res.status(200).send(data.rows);
//     }
//     catch (error) {
//         res.status(500).send(error);
//     }
// }

//ADAPTIVE FUNCTIONS THAT WORK FOR ANY TABLE//
const getData = (req, res) => {
    //remove the / from the req.url
    let route = req.url.slice(1); // '/route' --> 'route'
    //console.log({route})
    db.getData(route)
    .then(result => {
        res.status(200).send(result.rows);
    })
    .catch(error => {
        res.status(500).send(error)
    })
}
const addSample = (req, res) => {
    const entry = req.body;
    console.log({entry}); //{ entry: { count: '1', val: 'testing' } }
    let values = [entry.count, entry.val]
    db.addSample(values)
    .then(result => {
        res.status(200).send(result.rows);
    })
    .catch(error => {
        res.status(500).send(error)
    })
}
const changeSample = (req, res) => {
    //get path
    //remove the / from the req.url
    let route = req.url.slice(1); // '/route' --> 'route'
    const entry = req.body;
    let id = entry.id;
    let col = entry.field;
    let val = entry.props.value;
    //console.log({id, col, val})
    let values = [id, col, val];
    db.changeSample(route, values)
    .then(result => {
        res.status(200).send(result.rows);
    })
    .catch(error => {
        res.status(500).send(error)
    })
}




const getHeaders = (req, res) => {
    db.getHeaders()
    .then(result => {
        res.status(200).send(result.rows);
    })
    .catch(error => {
        res.status(500).send(error)
    })
}

module.exports = {
    getData,
    addSample,
    changeSample,
    getHeaders

}