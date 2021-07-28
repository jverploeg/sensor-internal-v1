import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


const generate = (sensor) => {

    // pdf.html(legend, {
    //     html2canvas: {
    //         // insert html2canvas options here, e.g.
    //         width: 200
    //     },
    //     callback: function () {
    //         // ...
    //     }
    // });


    var p1 = window.document.getElementById('page1');
    var p2 = window.document.getElementById('page2');
    let positionInfoP1 = p1.getBoundingClientRect();
    var scaleX = positionInfoP1.width / p1.offsetWidth; //0.6958332970028832
    var scaleY = positionInfoP1.height / p1.offsetHeight;//0.7000000115596887
    let reverseScaleX = 1.0/scaleX; //1.4371258235373816
    let reverseScaleY = 1.0/scaleY; //1.4285714049802274
    //console.log({scaleX,scaleY, reverseScaleX, reverseScaleY})
    //console.log(positionInfoP1)
        // bottom: 1096.4666748046875
        // height: 739.2000122070312
        // left: 91.18333435058594
        // right: 479.3333282470703
        // top: 357.26666259765625
        // width: 388.1499938964844
        // x: 91.18333435058594
        // y: 357.26666259765625
    let DOMwidth = positionInfoP1.width * reverseScaleX;//616
    let DOMheight = positionInfoP1.height * reverseScaleY;//1056
    console.log(DOMwidth,DOMheight)


    //initialize
    const doc = new jsPDF({
        hotfixes: ["px_scaling"],
        orientation:'portrait',
        unit: 'px', //pixels
        format: 'letter', //default is a4
    });
    var PageWidth = doc.internal.pageSize.getWidth();
    var PageHeight = doc.internal.pageSize.getHeight();
    var margins = {
        top: 27,
        bottom: 1030,
        right: 27,
        left: 27,
        width: 816, //612 - (right + left)
        height: 1054, //792 - (top + bottom)
    };
    html2canvas(p1)
    .then((canvas) => {
    const imgData = canvas.toDataURL('image/jpeg');
    // pdf.addImage(imgData, 'JPEG', 0, 0, 614.39, 793.58);
    doc.addImage(imgData, 'JPEG', 0, 0, DOMwidth, DOMheight);
    });
    html2canvas(p2)
    .then((canvas) => {
    const imgData2 = canvas.toDataURL('image/jpeg');
    doc.addPage();
    doc.addImage(imgData2, 'JPEG', 0, 0, DOMwidth, DOMheight);
    doc.save(`${sensor}.pdf`);
    });

    // var specialElementHandlers = {
    //     '#editor': function (element, renderer) {
    //         return true;
    //     }
    //   };
    // doc.html(p1, {
	// 	callback: function(doc) {
	// 		doc.save(`${sensor}.pdf`);
	// 	},
	// 	x: 10,
	// 	y: 10
	// });  
    // doc.save(`${sensor}.pdf`);
}
export default generate;

//https://www.freakyjolly.com/multipage-canvas-pdf-using-jspdf/
//https://stackoverflow.com/questions/294250/how-do-i-retrieve-an-html-elements-actual-width-and-height
//https://www.npmjs.com/package/rasterizehtml
//https://shamaahlawat.medium.com/page-split-using-jspdf-and-html2canvas-in-react-js-while-downloading-pdf-6c75da960019

// const quality = 1 // Higher the better but larger file
// html2canvas(document.querySelector('#html'),
//     { scale: quality }
// ).then(canvas => {
//     const pdf = new jsPDF('p', 'mm', 'a4');
//     pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 211, 298);
//     pdf.save(filename);
// });



// If you need to get width 100% of PDF file and auto height you can use getImageProperties property of html2canvas library

// html2canvas(input)
//       .then((canvas) => {
//         const imgData = canvas.toDataURL('image/png');
//         const pdf = new jsPDF({
//           orientation: 'landscape',
//         });
//         const imgProps= pdf.getImageProperties(imgData);
//         const pdfWidth = pdf.internal.pageSize.getWidth();
//         const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
//         pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
//         pdf.save('download.pdf');
//       });





// After you get the canvas object from the html2canvas method, use its context to draw the canvas again in your desired resolution.
// Like this for example,
// function resizeCanvas(canvas, newHeight, newWidth)
// {
//         var context = canvas.getContext('2d');
//         var imageData = context.getImageData(0, 0, canvas.width, canvas.width);
//         var newCanvas = document.createElement("canvas");
//         newCanvas.height = canvas.height;
//         newCanvas.width = canvas.width;
//         newCanvas.putImageData(imageData, 0, 0, 0, 0, newWidth, newHeight);
//         return newCanvas;
// }






// const print = () => {
//     var page = document.getElementsByClassName("page1");
//     //var page2 = document.getElementsByClassName("page2");
//     html2canvas(page[0])
//     .then((canvas) => {
//     const imgData = canvas.toDataURL('image/jpeg');
//     var page2 = document.getElementsByClassName("page2");

/*
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'pt', //points
      format: 'letter', //default is a4
        orientation: 'portrait',
        //unit: 'in', //points
        unit: 'pt',
        format: 'letter', //default is a4
    });
    html2canvas(page[0])
        .then((canvas) => {
        const imgData = canvas.toDataURL('image/jpeg');
        // const pdf = new jsPDF({
        // orientation: 'portrait',
        // unit: 'pt', //points
        // format: 'letter', //default is a4
        // });
        // pdf.addImage(imgData, 'JPEG', 0, 0, 8.5, 11);
        pdf.addImage(imgData, 'JPEG', 0, 0, 614.39, 793.58);
        //pdf.save('download.pdf');
    });
    html2canvas(page2[0])
        .then((canvas) => {
        const imgData = canvas.toDataURL('image/jpeg');
        pdf.addPage();
        // pdf.addImage(imgData, 'JPEG', 0, 0, 8.5, 11);
        pdf.addImage(imgData, 'JPEG', 0, 0, 614.39, 793.58);
        pdf.save('download.pdf');
    });
    pdf.addImage(imgData, 'JPEG', 0, 0, 612, 792);
    pdf.save('download.pdf');
  });
*/

// }
