// FUNCTIONAL DEPENDENCIES
import jsPDF from 'jspdf';

// STATIC ASSETS
import date from '../images/DATECODE1-Model.png';



const generatePDF = (S_Type, sensor, data, customData, images, bullets) => {

    //logic depends on sensor type
    if(S_Type === 'catalog') {
        //destructure redefine data/props
        //get relavent text pieces from the data package
        var specs = data[0];
        var type_description = data[1].type_description;
        var revision = specs.rev;
        var description = specs.title;
    } else if(S_Type === 'custom') {
        var specs = customData[0];
        //type description is in the title

        //option1
        var type_description = specs.title;
        var revision = specs.rev;
        //no description

        //option2
        let temp = specs.title;
        temp = temp.split(', ');
        var type_description2 = temp[0];
        temp.unshift();
        var description2 = temp.join(', ');
    }

    let footer = `Sensor Solutions * V: (970) 879-9900  F: (970) 879-9700 * www.sensorso.com * ${revision} `;



    



    //initialize the document
    const doc = new jsPDF({
        hotfixes: ["px_scaling"],
        orientation:'portrait',
        unit: 'px', //pixels
        format: 'letter', //default is a4
    });
    var margins = {
        top: 27,
        bottom: 1030,
        right: 27,
        left: 27,
        width: 816, //612 - (right + left)
        height: 1054, //792 - (top + bottom)
    };



    

    /////////////////1st PAGE IMAGES////////
    //doc.addImage(images.type, 'png', margins.left, 85, 336, 204);
    //doc.addImage(images.mech, 'png', 398, 193, 348, 96);
    doc.addImage(images.housing, 'png', margins.left, 306, 480, 216);
    doc.addImage(images.option, 'png', 541, 306, 204, 216);
    doc.addImage(images.connect, 'png', margins.left, 531, 480, 216);
    doc.addImage(images.conn_chart, 'png', 541, 531, 204, 108);
    doc.addImage(date, 'png', 541, 651, 204, 96);
    //////////////////////////////////////////

    /////////////////DESCRIPTION////////////////
    var descHTML = window.document.getElementById('description')
    doc.html(descHTML, {
        callback: function (doc) {
            //Add top 1/3 of page
                //////////////////HEADER////////////////////////////////
                doc.setFont('times','bold');
                doc.setFontSize(14);
                doc.text(sensor + '  -  ', margins.left,margins.top);
                //get location/width of this string so that type_description placed accordingly for catalog
                let newX = doc.getStringUnitWidth(sensor + '  -  ');//9.369 * 18.6 = 179.28 + m.left = 207.3
                doc.setFontSize(12);
                doc.setFont('times', 'italic');
                if(S_Type === 'catalog') {
                    doc.text(type_description, margins.left + (newX * 18.6), margins.top);//22
                    //break sensor description down based on text width so it fits within the page
                    let desc_lines = doc.splitTextToSize(description, 720);//762)//margins.width)
                    doc.text(desc_lines, margins.left, margins.top + 20);//+20?
                } else if(S_Type === 'custom') {
                    ////////option1/////////////
                    //need to split text, but need to start on first line with indent...
                    let length = (sensor.length) + 15; //? what value do we want here...csxxxx should always be relatively same length
                    let indent = new Array(length + 1).join(' ');
                    let indentedText = indent.concat(type_description);//empty text shouldnt overwrite visible text
                    let desc_lines = doc.splitTextToSize(indentedText, 720);//762)720 keeps right end even with images...
                    doc.text(desc_lines, margins.left, margins.top);//+20?
                }
                ////////////////////////////////////////////////////////

                ////////////BULLETS////////////////////
                let bulletLines = doc.splitTextToSize(bullets,391);//final, 391);
                doc.text(bulletLines, 398.5, 100);//106.25);//300, 80)
                ///////////////////////////////////////

                //type and mech images
                doc.addImage(images.type, 'png', margins.left, 85, 336, 204);
                doc.addImage(images.mech, 'png', 398, 193, 348, 96);


                    /////////////////////////////////////////////////////
                    //////////////////SECOND PAGE///////////////////////
                    ///////////////////////////////////////////////////

                    doc.addPage();

                    ///////////////HEADER//////////////////////////////
                    doc.setFont('times','bold');
                    doc.setFontSize(14);
                    doc.text(sensor + '  -  ', margins.left,margins.top);
                    ///////////////////////////////////////////////////
                    doc.setFontSize(12);
                    doc.setFont('times', 'italic');
                    if(S_Type === 'catalog') {
                        doc.text(type_description, margins.left + (newX * 18.6), margins.top);//22
                        //break sensor description down based on text width so it fits within the page
                        let desc_lines = doc.splitTextToSize(description, 720);//762)//margins.width)
                        doc.text(desc_lines, margins.left, margins.top + 20);//+20?
                    } else if(S_Type === 'custom') {
                        ///////option2
                        doc.text(type_description2, margins.left + (newX * 18.6), margins.top);
                        //break sensor description down based on text width so it fits within the page
                        let desc_lines = doc.splitTextToSize(description2, 762)//margins.width)
                        doc.text(desc_lines, margins.left, margins.top + 20);//+20?
                    }

                    /////////////////2nd PAGE IMAGES//////////////////////
                    doc.addImage(images.spec_chart, 'png', margins.left, 85, 720, 529);
                    doc.addImage(images.picture, 'png', margins.left, 650, 720, 384);//598, 720, 384);
                    //////////////////////////////////////////////////////

                    /////////////////////FOOTER////////////////////////
                    //(centered on page)
                    doc.setFontSize(10);
                    doc.setFont('times', 'italic');
                    doc.text(footer, 175, 1047)
                    ////////////////////////////////////////////////////

            //save pdf
            doc.save(`${sensor}.pdf`);
        },
        //margin: [],//[left, bottom, right, top]
        x: 0,
        y: 0,//750,//0
     });
     //////////////////////////////////////////////

    /////////////////////FOOTER////////////////////////
    //(centered on page)
    doc.setFontSize(10);
    doc.setFont('times', 'italic');
    doc.text(footer, 175, 1047)
    ////////////////////////////////////////////////////






    //!!!!!!!!!SECOND PAGE logic is all inside the doc.html() callback function!!!!!!!/////////
}
export default generatePDF;