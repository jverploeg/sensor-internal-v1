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
module.exports.changeData = async(path, data) => {
    let { id } = data;//.id;
    let { field } = data;//.field;
    let { value } = data;//.value;
    
    //add tablename to id field
    let table_id = path.concat('_id');
    const text = `UPDATE ${path} set ${field} = '${value}' where ${table_id} = '${id}'`;
    // async/await
    try {
        const res = await pool.query(text)
    } catch (err) {
        console.log(err.stack)
    }
}
module.exports.deleteRow = async(path, id) => {
    //add tablename to id field
    let table_id = path.concat('_id');
    const text = `DELETE FROM ${path} where ${table_id} = '${id}'`;
    // async/await
    try {
        const res = await pool.query(text)
    } catch (err) {
        console.log(err.stack)
    }
}

////////////EXISTENCE/////////////////////////////
module.exports.sensorExists = async(data) => {
    let qString = `SELECT * FROM sensor where part_number = '${data}'`;
    try {
        const response = await pool.query(qString);
        return response;
    }
    catch(error) {
        console.log(error)
    }
}
module.exports.customExists = async(data) => {
    let qString = `SELECT * FROM custom where part_number = '${data}'`;
    try {
        const response = await pool.query(qString);
        return response;
    }
    catch(error) {
        console.log(error)
    }
}



///////////SENSOR SPEC SEARCHES////////////////////

///////////////////CATALOG///////////////////////////////
module.exports.getSensor = async(data) => {
    let qString = `SELECT * FROM sensor where part_number = '${data}'`;
    try {
        const response = await pool.query(qString);
        return response;
    }
    catch(error) {
        console.log('not found in database')
        return error;
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
/////////////////////////////////////////////////////////////

//////////////////////////CUSTOM/////////////////////////////
module.exports.getCustom = async(sensor) => {
    let qString = `SELECT * FROM custom where part_number = '${sensor}'`;
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
//////////////////////////////////////////////////////////////

//////////////////PROTO///////////////////////////////////////
module.exports.getProto = async(sensor) => {
    //TODO:
    //xproto_code ??? or xproto_part_number??? neither are unique, so need to figure out how we want to modify xproto csv or schema
    let qString = `SELECT * FROM xproto where xproto_code = '${sensor}'`;
    try {
        const response = await pool.query(qString);
        return response;
    }
    catch(error) {
        return error;
    }
}
module.exports.getProtoType = async(data) => {
    let qString = `SELECT type from char where char_code = '${data}' limit 1`;
    try {
        const response = await pool.query(qString);
        return response;
    }
    catch(error) {
        return error;
    }
}
/////////////////////////////////////////////////////////////////////////
