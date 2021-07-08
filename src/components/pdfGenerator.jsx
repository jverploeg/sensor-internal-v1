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

    const images = require.context('../images', true);
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
    const h = images('./S8-Model.png')
    console.log({S8, h})
    doc.addImage(h.default, 'png', 0, 2.25, 5.0, 2.25);
    doc.save("a4.pdf");
    //startY is margin-top

}
export default generatePDF;










// import React from 'react';
// import jsPDF from 'jspdf';
// //import path from 'path';
// //import images from '../images'
// import S8 from '../images/housing/S8-Model.png'


// // const localPath = `D:/DATA/Sensor/webApp/images`;

// // function toDataUrl(url, callback) {
// //     var xhr = new XMLHttpRequest();
// //     xhr.onload = function() {
// //         var reader = new FileReader();
// //         reader.onloadend = function() {
// //             callback(reader.result);
// //         }
// //         reader.readAsDataURL(xhr.response);
// //     };
// //     xhr.open('GET', url);
// //     xhr.responseType = 'blob';
// //     xhr.send();
// // }
// // function getBase64Image(img) {
// //     var canvas = document.createElement("canvas");
// //     canvas.width = img.width;
// //     canvas.height = img.height;
// //     var ctx = canvas.getContext("2d");
// //     ctx.drawImage(img, 0, 0);
// //     var dataURL = canvas.toDataURL("image/png");
// //     return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
// //   }
  
// //var base64 = getBase64Image(document.getElementById("imageid"));




// //define generator function
// const generatePDF = (data) => { //(sensor, data) => {
//     let imagePath = `D:/DATA/Sensor/webApp/images/housing/S8-Model.png`;
//     console.log({imagePath})
//     //initialize
//     const doc = new jsPDF('p', 'in');
//     var img = new Image();
//     //The Image() constructor creates a new HTMLImageElement instance. 
//     console.log({img})
//     img.crossOrigin = "";
//     img.src = require(imagePath); //path.resolve(imagePath)
//     //img.src = S8; //path.resolve(imagePath)
//     //imgData = getBase64Image(img)
//     img.onload = function() {
//         doc.addImage(img, 'png', 5, 5, 5.0, 2.25);
//         //(imageData, format x, y, width, height)
//         //imageData 	string | HTMLImageElement | HTMLCanvasElement | Uint8Array imageData as base64 encoded DataUrl or Image-HTMLElement or Canvas-HTMLElement
//     };
//     console.log({img})
//     //const test = doc.getImageProperties(img);
//     // console.log({test})
//     // doc.addImage(imagePath, 'png', 5, 5, 5.0, 2.25);
//     //doc.addImage(S8, 'png', 0, 0, 5.0, 2.25);//, 5, 5, 720, 324);
//     doc.save("a4.pdf");
   
//     //break the search term down accordingly
//     // let segments = sensor.split('-');
//     // let housing = segments[0];
//     // let char = segments[1];
//     // let optConn = segments[2];
//     // let type = data[0].type;
//     // console.log(sensor, data, type);

//     //initialize
//     // const doc = new jsPDF('p', 'in');
    
//     // //let path = '../images/type/Type-DS-Model.png';
//     // //define images
//     // var typeImg = new Image();
//     // //let typePath = `C:/Users/senadmin/WebApps/sensor-internal-v1/src/images/type/Type-${type}-Model.png`;
//     // let typePath = `C:/Users/senadmin/WebApps/sensor-internal-v1/src/images/housing/S8-Model.png`;
//     // let typePath2 = `D:/DATA/Sensor/webApp/images/housing/S8-Model.png`;
//     // //C:\Users\senadmin\WebApps\sensor-internal-v1\src\images\housing\S8-Model.png
//     // console.log({typePath})
//     // //typeImg.src = require(`../images/type/Type-${type}-Model.png`);
//     // typeImg.crossOrigin = "";
//     // //typeImg.src = typePath;
//     // typeImg.src = typePath2; //S8;
//     // //typeImg.src = path.resolve(`../images/type/Type-${type}-Model.png`); //`../images/type/Type-${type}-Model.png`;
//     // //typeImg.src = 'C:/Users/senadmin/WebApps/sensor-internal-v1/src/images/type/Type-DS-Model.png'
//     // typeImg.onload = function() {
//     //     doc.addImage(typeImg, 'png', 5, 5, 5.0, 2.25);
//     // }
//     // // doc.addImage(typeImg, 'png', 5, 5, 3.25, 2.125);
//     // doc.save(`${data}.pdf`);
//     // var mechImg = new Image();
//     // var optionImg = new Image();
//     // img.src = imagePath; 
//     // // img.onload = function() {
//     // //     doc.addImage(img, 'png', 5, 5, 5.0, 2.25);
//     // //     //(imageData, format x, y, width, height)
//     // //     //imageData 	string | HTMLImageElement | HTMLCanvasElement | Uint8Array imageData as base64 encoded DataUrl or Image-HTMLElement or Canvas-HTMLElement
//     // // };
//     // //save pdf as sensor Number
//     // doc.save(`${data}.pdf`);

// }
// export default generatePDF;


// //text(text, x, y, options, transform)





// // Not allowed to load local resource: file:///D:/DATA/Sensor/webApp/images/housing/S8-Model.png



// //     //const doc = new jsPDF();
// //     //destructure redefine data/props
// //     console.log({data})
// //     //{require(`file:///D:/DATA/Sensor/webApp/images/housing/S8-Model.png`).default}
// //     //let imagePath = `file:///${localPath}/housing/${data}-Model.png`
// //     //let imagePath = `file:///D:/DATA/Sensor/webApp/images/housing/S8-Model.png`

// //     //https://stackoverflow.com/questions/19065562/add-image-in-pdf-using-jspdf
// //     //https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img
// //     //http://rahulgaba.com/front-end/2016/07/14/generating-pdf-using-jspdf-and-html2canvas.html

// //     let imagePath = `D:/DATA/Sensor/webApp/images/housing/S8-Model.png`;
// //     console.log({imagePath})
// //     //initialize
// //     const doc = new jsPDF('p', 'in');
// //     var img = new Image();
// //     //The Image() constructor creates a new HTMLImageElement instance. 
// //     console.log({img})
// //     img.crossOrigin = ""
// //     img.src = imagePath; //path.resolve(imagePath)
// //     //img.src = S8; //path.resolve(imagePath)
// //     img.onload = function() {
// //         doc.addImage(img, 'png', 5, 5, 5.0, 2.25);
// //         //(imageData, format x, y, width, height)
// //         //imageData 	string | HTMLImageElement | HTMLCanvasElement | Uint8Array imageData as base64 encoded DataUrl or Image-HTMLElement or Canvas-HTMLElement
// //     };
// //     console.log({img})
// //     //const test = doc.getImageProperties(img);
// //     // console.log({test})
// //     // doc.addImage(imagePath, 'png', 5, 5, 5.0, 2.25);
// //     //doc.addImage(S8, 'png', 0, 0, 5.0, 2.25);//, 5, 5, 720, 324);
// //     doc.save("a4.pdf");
// //     //startY is margin-top

// // }



// // Default export is a4 paper, portrait, using millimeters for units
// // const doc = new jsPDF();
// // // // Landscape export, 2×4 inches
// // // const doc = new jsPDF({
// // //     orientation: "landscape",
// // //     unit: "in",
// // //     format: [4, 2]
// // //   });
// // doc.text("Hello world!", 10, 10);
// // doc.save("a4.pdf");