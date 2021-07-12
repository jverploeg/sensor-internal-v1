import React from 'react';
import jsPDF from 'jspdf';
import axios from 'axios';
//import { convert } from 'html-to-text';
//const { htmlToText } = require('html-to-text');
import date from '../images/DATECODE1-Model.png';



//define generator function
const generatePDF = (sensor, data) => {
    let specs = data[0];
    let type_description = data[1].type_description;
    console.log({sensor, specs, type_description});
    console.log(type_description)
    console.log('here')
    //destructure redefine data/props

    //TODO: either here or in parser, logic to differentiate between 3 sensor types...

    //break the search term down accordingly
    let segments = sensor.split('-');
    let housing = segments[0];
    let char = segments[1];
    console.log({char})
    let optConn = segments[2];
    let type = specs.type;
    // let type_description = '';
    // typeDescription(type)
    //     .then(data => {
    //         //console.log({data})
    //         type_description = data[0].type_description;
    //         //console.log(type_description)
    //     });
    //console.log({type_description})
    let sensor_code = specs.sensor_code;
    let splitOps = sensor_code.split(housing); 
    let connect = splitOps[1]; //get accurate connection code(not always same length)
    let option = splitOps[0].slice(char.length); //get accurate option code

    //get relavent text pieces from the data package
    let revision = specs.rev;
    let description = specs.title;
    let footer = `Sensor Solutions * V: (970) 879-9900  F: (970) 879-9700 * www.sensorso.com * ${revision} `;


    //Bottom text 
    //TEMPORARY fix to retrieve and manipulate the html text for the spec description...
    //TODO: clean up logic, find if this works for all description files.....
    const description_html = require(`D:/DATA/Sensor/webApp/images/descriptions/${char}.html`).default;
    //console.log(description_html)
    //regex to modify
    var spec_text = description_html.replace(/<[^>]+>/g, '');
    spec_text = spec_text.replace(/\&nbsp\;/g, '');
    spec_text = spec_text.replace(/Title/, '');
    spec_text = spec_text.replace(/\n{2,8}/g, '');
    spec_text = spec_text.replace(/\t/g, '');
    //console.log(spec_text)
    let s_text = spec_text.split('\n');
    //join array back together
    s_text = s_text.join(' ');
    //console.log(s_text)
    s_text = s_text.replace(/' '{4,5}/g, '\n');//'12345' '10' '    '
    //TODO: fix newline logic
    //console.log(s_text)
    //lookahead for multiple strings ^(?=.*[a-zA-Z])(?=.*[~!@#$%^&*()_+])(?=.*\d).*$
    



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
    //get location/width of this string so that type_description placed accordingly
    let newX = doc.getStringUnitWidth(sensor + '  -  ');
    //doc.setFont('times','normal');
    doc.setFontSize(14);
    doc.text(type_description, margins.left + (newX * 16), margins.top);

    //break sensor description down based on text width so it fits within the page
    doc.setFontSize(12);
    doc.setFont('times', 'italic');
    let desc_lines = doc.splitTextToSize(description, margins.width)
    doc.text(desc_lines, margins.left, margins.top + 15);//+20?

    //TODO bullets!!!
    
    //ADD IMAGES FOR 1st Page
    // const typeImage = require(`D:/DATA/Sensor/webApp/images/type/Type-${type}-Model.png`);
    //     doc.addImage(typeImage.default, 'png', margins.left, 60, 252, 157);
    // const mechImage = require(`D:/DATA/Sensor/webApp/images/mech/${housing}-Mech-Model.png`);
    //     doc.addImage(mechImage.default, 'png', 300, 145, 261, 72);
    // const housingImage = require(`D:/DATA/Sensor/webApp/images/housing/${housing}-Model.png`);
    //     doc.addImage(housingImage.default, 'png', margins.left, 230, 360, 162);
    // const optionImage = require(`D:/DATA/Sensor/webApp/images/option/${option}-Model.png`);
    //     doc.addImage(optionImage.default, 'png', 407, 230, 153, 162);
    // const connectImage = require(`D:/DATA/Sensor/webApp/images/connect/${connect}-Model.png`);
    //     doc.addImage(connectImage.default, 'png', margins.left, 400, 360, 162);
    // const conn_chartsImage = require(`D:/DATA/Sensor/webApp/images/conn_charts/${connect}-${char}-Model.png`);
    //     doc.addImage(conn_chartsImage.default, 'png', 407, 400, 153, 92);
    //     doc.addImage(date, 'png', 407, 492, 153, 72);

    //Bottom text
    doc.setFontSize(10);//font size isnt 12 when looking at spec sheets printed currently
    doc.setFont('times', 'normal');
    let char_lines = doc.splitTextToSize(s_text, margins.width);
    doc.text(char_lines, margins.left, 580);
    // const description_html = require(`D:/DATA/Sensor/webApp/images/descriptions/${char}.html`).default;
    // console.log(description_html)

    //doc.fromHTML(description_html, margins.left, 580); NO LONGER SUPPORTED
    //footer
    doc.setFont('times', 'italic');
    //let footerW = doc.getStringUnitWidth(footer)
    //console.log(footerW*10);
    doc.text(footer, 132, 785)

    //SECOND PAGE
    //header
    doc.addPage();
    doc.setFont('times','bold');
    doc.setFontSize(16);
    doc.text(sensor + '  -  ', margins.left,margins.top); //text(textString, xstart, ystart)
    doc.setFontSize(14);
    doc.text(type_description, margins.left + (newX * 16), margins.top);
    doc.setFont('times', 'italic');
    doc.text(desc_lines, margins.left, margins.top + 15);//+20?

    //images
    const spec_chartsImage = require(`D:/DATA/Sensor/webApp/images/spec_charts/${char}-${option}-Model.png`);
        doc.addImage(spec_chartsImage.default, 'png', margins.left, 50, 540, 396);
    const pictureImage = require(`D:/DATA/Sensor/webApp/images/pictures/${housing}-${char}-Model.png`);
        doc.addImage(pictureImage.default, 'png', margins.left, 450, 540, 320);

    //footer    
    doc.setFont('times', 'italic');
    doc.text(footer, 132, 785);

    doc.save(`${sensor}.pdf`);
}
export default generatePDF;

/*
    //initialize
    const doc = new jsPDF('p', 'in');
    //set margins, and styling themes TODO
    //these coordinates are al using inches!!!
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