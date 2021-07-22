import React, { useState, useEffect } from 'react';
import axios from 'axios';


const customPdf = (input) => {
    //destructure props
    let input = {...input};
    //set state
    const [sensor, setSensor] = useState({});


    const host = `http://192.168.1.118:3000`;

    //get custom
    const getCustom = async(sensor) => {
        try {
            const response = await axios.get(`${host}/custom/${sensor}`);
            setSensor(response.data)
        }
        catch (error) {
            console.log(error)
        }
    }

    return sensor;
}
export default customPdf;
