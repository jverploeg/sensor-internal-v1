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
module.exports.addSample = async(values) => {
    const text = 'INSERT INTO sample(count, val) VALUES($1, $2)'
    // async/await
    try {
        const res = await pool.query(text, values)
        console.log(res.rows[0])
    } catch (err) {
        console.log(err.stack)
    }
}