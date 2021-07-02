import React from 'react';
import jsPDF from 'jspdf';
//import path from 'path';

const localPath = `D:/DATA/Sensor/webApp/images`;

//define generator function
const generatePDF = (data) => {
    //const doc = new jsPDF();
    //destructure redefine data/props
    console.log({data})
    let imagePath = `${localPath}/housing/${data}-Model.png`
    console.log({imagePath})
    var image = new Image();
    image.src = imagePath; //path.resolve(imagePath)
    console.log({image})
    //initialize
    const doc = new jsPDF();
    //doc.text("Hello world!", 10, 10);
    doc.addImage(image, 'png', 5, 5, 720, 324);
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