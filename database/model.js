const pool = require('./index');

module.exports.getData = async(path) => {
    //define vars based on path
    let id = path.concat('_id');
    //let qString = `SELECT * FROM ${path} ORDER BY char_id asc;`;
    let qString = `SELECT * FROM ${path} ORDER BY ${id} asc;`;
    //console.log({qString});
    try {
        const response = await pool.query(qString);
        return response;
    }
    catch(error) {
        return error;
    }
}

// module.exports.addSample = async(values) => {
//     const text = 'INSERT INTO sample(count, val) VALUES($1, $2)'
module.exports.addSample = async(path, cols, values) => {
    console.log({values})
    
    // for(let i = 0; i < values.length; i++) {
    //     let temp = values[i];
    //     values[i] = "" + temp + "";
    // }
    console.log({values})
    const text = `INSERT INTO ${path} (${cols}) VALUES('${values[0]}', '${values[1]}', '${values[2]}', '${values[3]}', '${values[4]}')`
    console.log({text})
    // async/await
    try {
        const res = await pool.query(text)
        console.log(res.rows[0])
    } catch (err) {
        console.log(err.stack)
    }
}
module.exports.changeSample = async(path, values) => {
    let col_name = values[1];
    let value = values[2];
    let id = values[0];
    //add tablename to id field
    let table_id = path.concat('_id');
    //console.log({col_name, value, id})
    //const text = `UPDATE sample set ${col_name} = '${value}' where id = ${id}`
    const text = `UPDATE ${path} set ${col_name} = '${value}' where ${table_id} = ${id}`;
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