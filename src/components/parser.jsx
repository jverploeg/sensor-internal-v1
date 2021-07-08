import React, { useState, useEffect } from 'react';
import axios from 'axios';
import generatePDF from './pdfGenerator';

function Parser(search) {
    //define state
    //const [sensorData, setSensorData] = useState([]); //data from database
    var sensorData = [];
    //determine type of sensor from leading term
    //check if valid sensor

    //temp define search term to save time
    let sensor = 'A47-18ADS-5KT21';
    //let sensor = search;

    const isValid = async(sensor) => {
        try {
            const response = await axios.get(`http://192.168.1.118:3000/sensorValid`, {params: {sensor}});
            //return response.data;
            //console.log(response.data);
            sensorData = response.data;
            generatePDF(sensor, sensorData);
            //console.log({sensorData});
        }
        catch (error) {
            console.log(error)
        }
    }
    isValid(sensor);
    //console.log({sensorData}); //this won't print anything, until isValid is run, but we can see we are getting data above

    // //break the search term down accordingly
    // let segments = sensor.split('-');
    // let housing = segments[0];
    // let char = segments[1];
    // let optConn = segments[2];
} 
export default Parser;

