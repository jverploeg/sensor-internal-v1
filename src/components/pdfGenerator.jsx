import jsPDF from 'jspdf';
import date from '../images/DATECODE1-Model.png';



//define generator function
//(sensorType, sensorCode, sensorData, customData, images, html)
const generatePDF = (S_Type, sensor, data, customData, images, text) => {
    //logic depends on sensor type
    if(S_Type === 'catalog') {
        //destructure redefine data/props
        var specs = data[0];
        var type_description = data[1].type_description;
        //TODO: either here or in parser, logic to differentiate between 3 sensor types...

        //break the search term down accordingly
        var segments = sensor.split('-');
        var housing = segments[0];
        var char = segments[1];
        var optConn = segments[2];
        var type = specs.type;
        var sensor_code = specs.sensor_code;
        var splitOps = sensor_code.split(housing); 
        var connect = splitOps[1]; //get accurate connection code(not always same length)
        var option = splitOps[0].slice(char.length); //get accurate option code

        //get relavent text pieces from the data package
        var revision = specs.rev;
        var description = specs.title;
    }

    let footer = `Sensor Solutions * V: (970) 879-9900  F: (970) 879-9700 * www.sensorso.com * ${revision} `;


    //BULLETS
    // const bullets_html = require(`D:/DATA/Sensor/webApp/images/pdf_bullets/${char}.html`).default;
    // var bullet_text = bullets_html.replace(/<[^>]+>/g, '');
    // let tester = bullets_html.split('\n');

    // let final = [];

    // tester.pop();
    // tester.shift();
    // for (let i = 0; i < tester.length; i++){
    //     //replace any list items
    //     var temp = tester[i].replace(/<[^>]+>/g, '');
    //     temp = temp.replace(/\r/g, '');
    //     //replace /r formatting
    //     if(temp.length > 3){
    //         final.push('o  ' + temp);
    //     }
    // }


    //Bottom text 
    //TEMPORARY fix to retrieve and manipulate the html text for the spec description...
    //TODO: clean up logic, find if this works for all description files.....
    // const description_html = require(`D:/DATA/Sensor/webApp/images/descriptions/${char}.html`).default;
    // //regex to modify
    // var spec_text = description_html.replace(/<[^>]+>/g, '');
    // spec_text = spec_text.replace(/\&nbsp\;/g, '');
    // spec_text = spec_text.replace(/Title/, '');
    // spec_text = spec_text.replace(/\n{2,8}/g, '');
    // spec_text = spec_text.replace(/\t/g, '');
    // let s_text = spec_text.split("\n\n");//'\n');("\\r?\\n")

    //s_text = s_text.join(' ');
    //s_text = s_text.replace(/' '{4,5}/g, '\n');//'12345' '10' '    '
    //lookahead for multiple strings ^(?=.*[a-zA-Z])(?=.*[~!@#$%^&*()_+])(?=.*\d).*$
    



    //initialize
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
    doc.setFont('times','bold');
    doc.setFontSize(14);
    doc.text(sensor + '  -  ', margins.left,margins.top);
    //get location/width of this string so that type_description placed accordingly
    let newX = doc.getStringUnitWidth(sensor + '  -  ');
    //console.log(newX) == 9.369 * 18.6 = 179.28 + m.left = 207.3
    doc.setFontSize(12);
    doc.text(type_description, margins.left + (newX * 18.6), margins.top);//22

    //break sensor description down based on text width so it fits within the page
    //doc.setFontSize(12);
    doc.setFont('times', 'italic');
    let desc_lines = doc.splitTextToSize(description, 762)//margins.width)
    doc.text(desc_lines, margins.left, margins.top + 20);//+20?

    //bullets
    let bulletLines = doc.splitTextToSize(text.bullets,391);//final, 391);
    doc.text(bulletLines, 398.5, 106.25);//300, 80)
    

    //ADD IMAGES FOR 1st Page
    doc.addImage(images.type, 'png', margins.left, 85, 336, 204);
    doc.addImage(images.mech, 'png', 398, 193, 348, 96);
    doc.addImage(images.housing, 'png', margins.left, 306, 480, 216);
    doc.addImage(images.option, 'png', 541, 306, 204, 216);
    doc.addImage(images.connect, 'png', margins.left, 531, 480, 216);
    doc.addImage(images.conn_chart, 'png', 541, 531, 204, 108);
    doc.addImage(date, 'png', 541, 651, 204, 96);

    //Bottom text
    doc.setFontSize(10);//font size isnt 12 when looking at spec sheets printed currently
    doc.setFont('times', 'normal');
    let char_lines = doc.splitTextToSize(text.desc, 762);//s_text, 762);
    doc.text(char_lines, margins.left, 770);//580);

    //footer(centered on page)
    doc.setFontSize(10);
    doc.setFont('times', 'italic');
    doc.text(footer, 175, 1047)

    //SECOND PAGE

    //header
    doc.addPage();
    doc.setFont('times','bold');
    doc.setFontSize(14);
    doc.text(sensor + '  -  ', margins.left,margins.top);
    doc.setFontSize(12);
    doc.text(type_description, margins.left + (newX * 18.6), margins.top)//(newX * 22), margins.top);
    //doc.setFontSize(12);
    doc.setFont('times', 'italic');
    doc.text(desc_lines, margins.left, margins.top + 20);//+20?

    //images
    doc.addImage(images.spec_chart, 'png', margins.left, 85, 720, 529);
    doc.addImage(images.picture, 'png', margins.left, 650, 720, 384);//598, 720, 384);


    //footer
    doc.setFontSize(10);    
    doc.setFont('times', 'italic');
    doc.text(footer, 175, 1047);

    //save pdf image
    doc.save(`${sensor}.pdf`);
}
export default generatePDF;
