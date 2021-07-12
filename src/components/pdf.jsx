import React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import date from '../images/DATECODE1-Model.png';



const pdfTest = () => {

    // //define stuff
    // const printDocument= () => {
    //     const input = document.getElementById('testing');
    //     const pdf = new jsPDF();
    //     if (pdf) {
    //       html2canvas(input, {
    //         useCORS: true
    //       })
    //         .then(canvas => {
    //           const imgData = canvas.toDataURL('image/png');
    //           console.log(imgData); //Maybe blank, maybe full image, maybe half of image
    //           pdf.addImage(imgData, 'PNG', 10, 10, 100, 200);
    //           pdf.save('download.pdf');
    //         });
    //     }
    // }
    //console.log('hello')

    return (
        <div>
            <div className="testing">
                <h1>hello</h1>
            </div>
        </div>
    )
}
export default pdfTest;
