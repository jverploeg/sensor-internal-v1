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
const getSample = (req, res) => {
    db.getSample()
    .then(result => {
        res.status(200).send(result.rows);
    })
    .catch(error => {
        res.status(500).send(error)
    })
}




module.exports = {
    getSample,

}