import React, { useState, useEffect } from 'react';
import axios from 'axios';
import generatePDF from './pdfGenerator';

function Parser(search) {
    //define state
    //const [sensorData, setSensorData] = useState([]); //data from database
    //var sensorData = [];
    //determine type of sensor from leading term
    //check if valid sensor

    //temp define search term to save time
    let sensor = 'A47-18ADS-5KT21';
    //let sensor = search;
    let segments = sensor.split('-');
    let type = segments[1];
    const typeDescription = async(type) => {
        try {
            const {data:response} = await axios.get(`http://192.168.1.118:3000/type`, {params: {type}});
            return response;
        }
        catch (error) {
            console.log(error);
        }
    }

    const isValid = async(sensor) => {
        try {
            const {data:response} = await axios.get(`http://192.168.1.118:3000/sensorValid`, {params: {sensor}});
            //const { data } = await response;
            return response;
            //console.log(response.data);
            // sensorData = response.data;
            // console.log(sensorData)
            // let type = sensorData[0].type;
            // let type_description = typeDescription(type);
            //generatePDF(sensor, data);//, type_description);
            //pdfTest();
            //generatePDF();
            //console.log({sensorData});
        }
        catch (error) {
            console.log(error)
        }
    }
    //isValid(sensor);
    // isValid(sensor)
    // .then(data => {
    //     console.log(data);
    // })
    const getSensor = async(sensor, type) => {
        try {
            const response = await Promise.all([
                axios.get(`http://192.168.1.118:3000/sensorValid`, {params: {sensor}}),
                axios.get(`http://192.168.1.118:3000/type`, {params: {type}}),
            ]);
            const data = response.map((response) => response.data);
            let output = data.flat();
            //console.log({output});
            generatePDF(sensor, output);
        } catch (error) {
            console.log(error)
            //throw Error("Promise Failed");
        }
    }
    getSensor(sensor, type);
    // var sensorData = isValid(sensor);
    // console.log(sensorData)
    // let type = sensorData[0].type;
    // let type_description = typeDescription(type);
    // generatePDF(sensor, sensorData, type_description);
    //console.log({sensorData}); //this won't print anything, until isValid is run, but we can see we are getting data above

    // //break the search term down accordingly
    // let segments = sensor.split('-');
    // let housing = segments[0];
    // let char = segments[1];
    // let optConn = segments[2];
} 
export default Parser;