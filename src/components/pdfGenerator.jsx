import React from 'react';
import jsPDF from 'jspdf';
import date from '../images/DATECODE1-Model.png';



//define generator function
const generatePDF = (sensor, data) => {
    //destructure redefine data/props

    //TODO: either here or in parser, logic to differentiate between 3 sensor types...

    //break the search term down accordingly
    let segments = sensor.split('-');
    let housing = segments[0];
    let char = segments[1];
    let optConn = segments[2];
    let type = data[0].type;
    let sensor_code = data[0].sensor_code;
    let splitOps = sensor_code.split(housing); 
    let connect = splitOps[1]; //get accurate connection code(not always same length)
    let option = splitOps[0].slice(char.length); //get accurate option code

    //get relavent text pieces from the data package
    let revision = data[0].rev;
    let description = data[0].title;
    console.log(data[0]);



/*
    //initialize
    const doc = new jsPDF('p', 'in');
    //set margins, and styling themes TODO

    const typeImage = require(`D:/DATA/Sensor/webApp/images/type/Type-${type}-Model.png`);
        doc.addImage(typeImage.default, 'png', 0, 0, 3.5, 2.125);
    const mechImage = require(`D:/DATA/Sensor/webApp/images/mech/${housing}-Mech-Model.png`);
        doc.addImage(mechImage.default, 'png', 4.625, 1, 3.625, 1);
    const housingImage = require(`D:/DATA/Sensor/webApp/images/housing/${housing}-Model.png`);
        doc.addImage(housingImage.default, 'png', 0, 2.25, 5, 2.25);
    const optionImage = require(`D:/DATA/Sensor/webApp/images/option/${option}-Model.png`);
        doc.addImage(optionImage.default, 'png', 5.5, 2.25, 2.125, 2.25);
    const connectImage = require(`D:/DATA/Sensor/webApp/images/connect/${connect}-Model.png`);
        doc.addImage(connectImage.default, 'png', 0, 5.25, 5, 2.25);
    const conn_chartsImage = require(`D:/DATA/Sensor/webApp/images/conn_charts/${connect}-${char}-Model.png`);
        doc.addImage(conn_chartsImage.default, 'png', 5.5, 5.25, 2.125, 1.125);
        doc.addImage(date, 'png', 5.5, 6.475, 2.125, 1);
    
    //SECOND PAGE
    doc.addPage();
    const spec_chartsImage = require(`D:/DATA/Sensor/webApp/images/spec_charts/${char}-${option}-Model.png`);
        doc.addImage(spec_chartsImage.default, 'png', 0, 0, 7.5, 5.5);
    const pictureImage = require(`D:/DATA/Sensor/webApp/images/pictures/${housing}-${char}-Model.png`);
        doc.addImage(pictureImage.default, 'png', 0, 6, 7.5, 4);

    doc.save("a4.pdf");
*/

}
export default generatePDF;
