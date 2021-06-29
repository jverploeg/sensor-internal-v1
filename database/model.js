const pool = require('./index');

module.exports.getData = async(path) => {
    //define vars based on path
    let id = path.concat('_id');
    let qString = `SELECT * FROM ${path} ORDER BY ${id} asc;`;
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
module.exports.addData = async(path, cols, values) => {
    const text = `INSERT INTO ${path} (${cols}) VALUES('${values[0]}', '${values[1]}', '${values[2]}', '${values[3]}', '${values[4]}')`
    // async/await
    try {
        const res = await pool.query(text)
        console.log(res.rows[0])
    } catch (err) {
        console.log(err.stack)
    }
}
module.exports.changeData = async(path, values) => {
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


///////////SENSOR SPEC SEARCHES////////////////////
module.exports.getSensor = async(data) => {
    //split data into tables, part_ids
    //multiple queries
    //promisify/sequelize????

    let hString = `SELECT * FROM housing where housing_id = ${something}`;
    let chString = `SELECT * FROM char where char_id = ${something}`;
    let oString = `SELECT * FROM option where option_id = ${something}`;
    let cnString = `SELECT * FROM conn where conn_id = ${something}`;
    try {
        const response = await pool.query(qString);
        return response;
    }
    catch(error) {
        return error;
    }
}
module.exports.getCustom = async(data) => {
    //split data into tables, part_ids
    //multiple queries
    //promisify/sequelize????

    let hString = `SELECT * FROM housing where housing_id = ${something}`;
    let chString = `SELECT * FROM char where char_id = ${something}`;
    let oString = `SELECT * FROM option where option_id = ${something}`;
    let cnString = `SELECT * FROM conn where conn_id = ${something}`;
    try {
        const response = await pool.query(qString);
        return response;
    }
    catch(error) {
        return error;
    }
}
