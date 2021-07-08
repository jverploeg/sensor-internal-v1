import React from 'react';
import jsPDF from 'jspdf';
//import path from 'path';
import S8 from '../images/S8-Model.png'

const localPath = `D:/DATA/Sensor/webApp/images`;

//define generator function
const generatePDF = (data) => {
    //const doc = new jsPDF();
    //destructure redefine data/props
    console.log({data})
    //{require(`file:///D:/DATA/Sensor/webApp/images/housing/S8-Model.png`).default}
    //let imagePath = `file:///${localPath}/housing/${data}-Model.png`
    //let imagePath = `file:///D:/DATA/Sensor/webApp/images/housing/S8-Model.png`

    //https://stackoverflow.com/questions/19065562/add-image-in-pdf-using-jspdf
    //https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img

    let imagePath = `D:/DATA/Sensor/webApp/images/housing/S8-Model.png`;
    let imagePath2 = `file:///D:/DATA/Sensor/webApp/images/housing/S8-Model.png`;
    console.log({imagePath2})
    //initialize
    const doc = new jsPDF('p', 'in');
    // var img = new Image();
    // //The Image() constructor creates a new HTMLImageElement instance. 
    // console.log({img})
    // img.crossOrigin = ""
    // //img.src = imagePath; //path.resolve(imagePath)
    // img.src = S8; //path.resolve(imagePath)
    // img.onload = function() {
    //     doc.addImage(img, 'png', 5, 5, 5.0, 2.25);
    //     //(imageData, format x, y, width, height)
    //     //imageData 	string | HTMLImageElement | HTMLCanvasElement | Uint8Array imageData as base64 encoded DataUrl or Image-HTMLElement or Canvas-HTMLElement
    // };
    //const test = doc.getImageProperties(img);
    // console.log({test})
    // doc.addImage(imagePath, 'png', 5, 5, 5.0, 2.25);
    // var img = new Image();
    // img.src = '../images/S8-Model.png';
    // doc.addImage(img, 'png', 0, 0, 5.0, 2.25);//, 5, 5, 720, 324);

    //this works..........
    doc.addImage(S8, 'png', 0, 0, 5.0, 2.25);
    doc.save("a4.pdf");
    //startY is margin-top

}
export default generatePDF;

// Not allowed to load local resource: file:///D:/DATA/Sensor/webApp/images/S8.png







// Default export is a4 paper, portrait, using millimeters for units
// const doc = new jsPDF();
// // // Landscape export, 2×4 inches
// // const doc = new jsPDF({
// //     orientation: "landscape",
// //     unit: "in",
// //     format: [4, 2]
// //   });
// doc.text("Hello world!", 10, 10);
// doc.save("a4.pdf");