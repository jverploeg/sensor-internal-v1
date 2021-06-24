const pool = require('./index');

module.exports.getSample = async() => {
    let qString = `SELECT * FROM sample ORDER BY id asc;`;
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
module.exports.changeSample = async(values) => {
    let col_name = values[1];
    let value = values[2];
    let id = values[0];
    //console.log({col_name, value, id})
    const text = `UPDATE sample set ${col_name} = '${value}' where id = ${id}`
    // async/await
    try {
        const res = await pool.query(text)
        console.log(res.rows[0])
    } catch (err) {
        console.log(err.stack)
    }
}


module.exports.getHeaders = async() => {
    let qString = `SELECT * FROM sample where false;`;
    try {
        const response = await pool.query(qString);
        return response;
    }
    catch(error) {
        return error;
    }
}