import React from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import date from '../images/DATECODE1-Model.png';



//define generator function
const generatePDF = () => {//(sensor, data) => {
    
        //define stuff
            const input = document.getElementById('testing');
            const input2 = document.getElementsByClassName('testing');
            console.log({input, input2})
            const pdf = new jsPDF();
            if (pdf) {
              html2canvas(input2[0])
                .then(canvas => {
                  const imgData = canvas.toDataURL('image/png');
                  console.log(imgData); //Maybe blank, maybe full image, maybe half of image
                  pdf.addImage(imgData, 'PNG', 10, 10, 100, 200);
                  pdf.save('download.pdf');
                });
            }
    
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
    // console.log(data[0]);



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