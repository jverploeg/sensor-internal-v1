import React from 'react';
import jsPDF from 'jspdf';
import axios from 'axios';
import date from '../images/DATECODE1-Model.png';



//define generator function
const generatePDF = (sensor, data) => {
    const typeDescription = async(type) => {
        // await axios.get(`http://192.168.1.118:3000/type`, {params: {type}})
        // .then(res => {
        //     return res.data;
        // })
        // .catch(error => {
        //     console.log(error);
        // })
        //try {
            const response = await axios.get(`http://192.168.1.118:3000/type`, {params: {type}});
            //const { data } = await response;
            return response.data;
        // }
        // catch (error) {
        //     console.log(error);
        // }
    }
    //console.log({sensor, data});//, ty})
    //destructure redefine data/props

    //TODO: either here or in parser, logic to differentiate between 3 sensor types...

    //break the search term down accordingly
    let segments = sensor.split('-');
    let housing = segments[0];
    let char = segments[1];
    let optConn = segments[2];
    let type = data[0].type;
    let type_description = '';
    typeDescription(type)
        .then(data => {
            //console.log({data})
            type_description = data[0].type_description;
            //console.log(type_description)
        });
    //console.log({type_description})
    let sensor_code = data[0].sensor_code;
    let splitOps = sensor_code.split(housing); 
    let connect = splitOps[1]; //get accurate connection code(not always same length)
    let option = splitOps[0].slice(char.length); //get accurate option code

    //get relavent text pieces from the data package
    let revision = data[0].rev;
    let description = data[0].title;
    //let type_description = ty.value.data[0].type_description;
    
    //console.log('sensorData', data[0]);

    //initialize
    const doc = new jsPDF({
        orientation:'portrait',
        unit: 'pt', //points
        format: 'letter', //default is a4
    });
    var margins = {
        top: 20,
        bottom: 42,
        right: 40,
        left: 20,
        width: 552, //612 - (right + left)
        height: 730, //792 - (top + bottom)
    };
    doc.setFont('times','bold');
    doc.setFontSize(16);
    doc.text(sensor + '  -  ', margins.left,margins.top); //text(textString, xstart, ystart)
    //get location/width of this string
    let newX = doc.getStringUnitWidth(sensor + '  -  ');
    console.log(newX)
    doc.setFont('times','normal');
    doc.setFontSize(14);
    doc.text(type_description, margins.left + (newX * 16), margins.top)
    //set margins, and styling themes TODO


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

    
*/
    doc.save("a4.pdf");
}
export default generatePDF;
/*
import React from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import date from '../images/DATECODE1-Model.png';
import PdfCanvas from './pdfCanvas';



//define generator function
const generatePDF = (sensor, data) => {

    const pdfCan = document.getElementById('divToPrint');
    html2canvas(pdfCan)
        .then((canvas) => {
            const divImage = canvas.toDataURL("image/png");
            const pdf = new jsPDF();
            pdf.addImage(divImage, 'PNG', 0, 0);
            pdf.save("download.pdf");
   })

    // const doc = new jsPDF({
    //     orientation:'portrait',
    //     unit: 'pt', //points
    // });

    // doc.save("a4.pdf");


}
export default generatePDF;




    //////////INCHES////////////////
    // const typeImage = require(`D:/DATA/Sensor/webApp/images/type/Type-${type}-Model.png`);
    //     doc.addImage(typeImage.default, 'png', 0, 0, 3.5, 2.125);
    // const mechImage = require(`D:/DATA/Sensor/webApp/images/mech/${housing}-Mech-Model.png`);
    //     doc.addImage(mechImage.default, 'png', 4.625, 1, 3.625, 1);
    // const housingImage = require(`D:/DATA/Sensor/webApp/images/housing/${housing}-Model.png`);
    //     doc.addImage(housingImage.default, 'png', 0, 2.25, 5, 2.25);
    // const optionImage = require(`D:/DATA/Sensor/webApp/images/option/${option}-Model.png`);
    //     doc.addImage(optionImage.default, 'png', 5.5, 2.25, 2.125, 2.25);
    // const connectImage = require(`D:/DATA/Sensor/webApp/images/connect/${connect}-Model.png`);
    //     doc.addImage(connectImage.default, 'png', 0, 5.25, 5, 2.25);
    // const conn_chartsImage = require(`D:/DATA/Sensor/webApp/images/conn_charts/${connect}-${char}-Model.png`);
    //     doc.addImage(conn_chartsImage.default, 'png', 5.5, 5.25, 2.125, 1.125);
    //     doc.addImage(date, 'png', 5.5, 6.475, 2.125, 1);
    
    // //SECOND PAGE
    // doc.addPage();
    // const spec_chartsImage = require(`D:/DATA/Sensor/webApp/images/spec_charts/${char}-${option}-Model.png`);
    //     doc.addImage(spec_chartsImage.default, 'png', 0, 0, 7.5, 5.5);
    // const pictureImage = require(`D:/DATA/Sensor/webApp/images/pictures/${housing}-${char}-Model.png`);
    //     doc.addImage(pictureImage.default, 'png', 0, 6, 7.5, 4);









        //destructure redefine data/props

    //TODO: either here or in parser, logic to differentiate between 3 sensor types...

    //break the search term down accordingly
    // let segments = sensor.split('-');
    // let housing = segments[0];
    // let char = segments[1];
    // let optConn = segments[2];
    // let type = data[0].type;
    // let sensor_code = data[0].sensor_code;
    // let splitOps = sensor_code.split(housing); 
    // let connect = splitOps[1]; //get accurate connection code(not always same length)
    // let option = splitOps[0].slice(char.length); //get accurate option code

    // //get relavent text pieces from the data package
    // let revision = data[0].rev;
    // let description = data[0].title;
    // console.log({description})
    // let footer = `Sensor Solutions * V: (970) 879-9900  F: (970) 879-9700 * www.sensorso.com * ${revision} `;

    // doc.addFont("Arimo-Regular.ttf", "Arimo", "normal");
    // doc.addFont("Arimo-Bold.ttf", "Arimo", "bold");
    
    // doc.setFont("Arimo");
    // doc.setFontType("normal");
    // doc.setFontSize(28);
    
    // doc.text("Hello, World!", 100, 100);
    
    // doc.setFontType("bold");
    
    // doc.text("Hello, BOLD World!", 100, 150);


    // //initialize
    // const doc = new jsPDF({
    //     orientation:'portrait',
    //     unit: 'pt', //points
    // });
    // var margins = {
    //     top: 20,
    //     bottom: 42,
    //     left: 40,
    //     //width: 522
    // };
    // doc.setFont('times','bold');
    // doc.setFontSize(16);
    // doc.text(sensor + ' - ', 0,20);
    // doc.setFont('times','normal');
    // doc.text(description, 0, 30)
    // //set margins, and styling themes TODO


    //////////INCHES////////////////
    // const typeImage = require(`D:/DATA/Sensor/webApp/images/type/Type-${type}-Model.png`);
    //     doc.addImage(typeImage.default, 'png', 0, 0, 3.5, 2.125);
    // const mechImage = require(`D:/DATA/Sensor/webApp/images/mech/${housing}-Mech-Model.png`);
    //     doc.addImage(mechImage.default, 'png', 4.625, 1, 3.625, 1);
    // const housingImage = require(`D:/DATA/Sensor/webApp/images/housing/${housing}-Model.png`);
    //     doc.addImage(housingImage.default, 'png', 0, 2.25, 5, 2.25);
    // const optionImage = require(`D:/DATA/Sensor/webApp/images/option/${option}-Model.png`);
    //     doc.addImage(optionImage.default, 'png', 5.5, 2.25, 2.125, 2.25);
    // const connectImage = require(`D:/DATA/Sensor/webApp/images/connect/${connect}-Model.png`);
    //     doc.addImage(connectImage.default, 'png', 0, 5.25, 5, 2.25);
    // const conn_chartsImage = require(`D:/DATA/Sensor/webApp/images/conn_charts/${connect}-${char}-Model.png`);
    //     doc.addImage(conn_chartsImage.default, 'png', 5.5, 5.25, 2.125, 1.125);
    //     doc.addImage(date, 'png', 5.5, 6.475, 2.125, 1);
    
    // //SECOND PAGE
    // doc.addPage();
    // const spec_chartsImage = require(`D:/DATA/Sensor/webApp/images/spec_charts/${char}-${option}-Model.png`);
    //     doc.addImage(spec_chartsImage.default, 'png', 0, 0, 7.5, 5.5);
    // const pictureImage = require(`D:/DATA/Sensor/webApp/images/pictures/${housing}-${char}-Model.png`);
    //     doc.addImage(pictureImage.default, 'png', 0, 6, 7.5, 4);

    */