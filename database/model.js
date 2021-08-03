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

module.exports.addData = async(path, cols, values) => {
    //TODO: FIX, UPDATE FOR LARGER TABLES
    const text = `INSERT INTO ${path} (${cols}) VALUES('${values[0]}', '${values[1]}', '${values[2]}', '${values[3]}', '${values[4]}')`
    // async/await
    try {
        const res = await pool.query(text)
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
    const text = `UPDATE ${path} set ${col_name} = '${value}' where ${table_id} = ${id}`;
    // async/await
    try {
        const res = await pool.query(text)
    } catch (err) {
        console.log(err.stack)
    }
}

////////////EXISTENCE/////////////////////////////
module.exports.sensorExists = async(data) => {
    //let qString = `SELECT * FROM sensor where EXISTS( SELECT 1 from sensor where part_number = '${data}')`;
    let qString = `SELECT * FROM sensor where part_number = '${data}'`;
    try {
        const response = await pool.query(qString);
        //console.log(response.rowCount);
        //return response.rowCount;
        return response;
    }
    catch(error) {
        // return [error, 'Sensor Not Found'];
        //console.log('not found in database')
        //return false;
        console.log(error)
    }
}



///////////SENSOR SPEC SEARCHES////////////////////
module.exports.getSensor = async(data) => {
    let qString = `SELECT * FROM sensor where part_number = '${data}'`;
    try {
        const response = await pool.query(qString);
        //console.log({response}, response.rowCount);
        return response;
    }
    catch(error) {
        // return [error, 'Sensor Not Found'];
        console.log('not found in database')
        return false;
    }
}

module.exports.getType = async(data) => {
    let qString = `SELECT type_description from char where char_code = '${data}' limit 1`;
    try {
        const response = await pool.query(qString);
        return response;
    }
    catch(error) {
        return error;
    }
}
module.exports.getCustomType = async(data) => {
    let qString = `SELECT type from char where char_code = '${data}' limit 1`;
    try {
        const response = await pool.query(qString);
        return response;
    }
    catch(error) {
        return error;
    }
}

module.exports.getCustom = async(sensor) => {
    // let qString = `SELECT (custom_sensor_code, rev, title) FROM custom where part_number = '${sensor}'`; //issues with formatting... just get the whole row
    let qString = `SELECT * FROM custom where part_number = '${sensor}'`;
    try {
        const response = await pool.query(qString);
        return response;
    }
    catch(error) {
        return error;
    }
}