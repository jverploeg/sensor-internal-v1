const pool = require('./index');

module.exports.getSample = async() => {
    let qString = `SELECT * FROM sample;`;
    try {
        const response = await pool.query(qString);
        return response;
    }
    catch(error) {
        return error;
    }
}