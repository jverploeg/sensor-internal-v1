import axios from 'axios';
import generatePDF from './pdfGenerator';

function Parser(search) {
    //let sensor = search;
    //determine type of sensor from leading term
    //check if valid sensor

    //temp define search term to save time
    let sensor = 'A47-18ADS-5KT21';
    
    let segments = sensor.split('-');
    let type = segments[1];


    const getSensor = async(sensor, type) => {
        try {
            const response = await Promise.all([
                axios.get(`http://192.168.1.118:3000/sensorValid`, {params: {sensor}}),
                axios.get(`http://192.168.1.118:3000/type`, {params: {type}}),
            ]);
            const data = response.map((response) => response.data);
            let output = data.flat();
            generatePDF(sensor, output);
        } catch (error) {
            console.log(error)
        }
    }
    getSensor(sensor, type);
} 
export default Parser;