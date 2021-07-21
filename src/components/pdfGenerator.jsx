import jsPDF from 'jspdf';
import date from '../images/DATECODE1-Model.png';



//define generator function
const generatePDF = (sensor, data, images) => {
    //destructure redefine data/props
    let specs = data[0];
    let type_description = data[1].type_description;


    //TODO: either here or in parser, logic to differentiate between 3 sensor types...

    //break the search term down accordingly
    let segments = sensor.split('-');
    let housing = segments[0];
    let char = segments[1];
    let optConn = segments[2];
    let type = specs.type;
    let sensor_code = specs.sensor_code;
    let splitOps = sensor_code.split(housing); 
    let connect = splitOps[1]; //get accurate connection code(not always same length)
    let option = splitOps[0].slice(char.length); //get accurate option code

    //get relavent text pieces from the data package
    let revision = specs.rev;
    let description = specs.title;
    let footer = `Sensor Solutions * V: (970) 879-9900  F: (970) 879-9700 * www.sensorso.com * ${revision} `;


    //BULLETS
    const bullets_html = require(`D:/DATA/Sensor/webApp/images/pdf_bullets/${char}.html`).default;
    console.log(bullets_html);
    var bullet_text = bullets_html.replace(/<[^>]+>/g, '');
    console.log(bullet_text)
    bullet_text = bullet_text.replace(/\r/g, '');
    console.log(bullet_text)
    bullet_text = bullet_text.split('\n');
    console.log(bullet_text)
    //remove first & last elements
    bullet_text.shift();//.pop();;
    bullet_text.pop();
    console.log(bullet_text);
    //add 'bullet point to start of each line
    for(let i = 0; i < bullet_text.length; i++){
        
        bullet_text[i] = 'o  '+ bullet_text[i];
    };
    console.log(bullet_text);

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
    doc.setFontSize(16);
    doc.text(sensor + '  -  ', margins.left,margins.top);
    //get location/width of this string so that type_description placed accordingly
    let newX = doc.getStringUnitWidth(sensor + '  -  ');
    doc.setFontSize(14);
    doc.text(type_description, margins.left + (newX * 22), margins.top);

    //break sensor description down based on text width so it fits within the page
    doc.setFontSize(12);
    doc.setFont('times', 'italic');
    let desc_lines = doc.splitTextToSize(description, 762)//margins.width)
    doc.text(desc_lines, margins.left, margins.top + 20);//+20?

    //TODO bullets!!!
    doc.text(bullet_text, 398.5, 106.25);//300, 80)
    
    //ADD IMAGES FOR 1st Page
    doc.addImage(images.type, 'png', margins.left, 85, 336, 204);
    doc.addImage(images.mech, 'png', 398, 193, 348, 96);
    doc.addImage(images.housing, 'png', margins.left, 306, 480, 216);
    doc.addImage(images.option, 'png', 541, 306, 204, 216);
    doc.addImage(images.connect, 'png', margins.left, 531, 480, 216);
    doc.addImage(images.conn_chart, 'png', 541, 531, 204, 108);
    doc.addImage(date, 'png', 541, 651, 204, 96);

    //Bottom text
    // doc.setFontSize(10);//font size isnt 12 when looking at spec sheets printed currently
    // doc.setFont('times', 'normal');
    // let char_lines = doc.splitTextToSize(s_text, margins.width);
    // doc.text(char_lines, margins.left, 580);

    //footer(centered on page)
    doc.setFontSize(10);
    doc.setFont('times', 'italic');
    doc.text(footer, 175, 1030)

    //SECOND PAGE

    //header
    doc.addPage();
    doc.setFont('times','bold');
    doc.setFontSize(16);
    doc.text(sensor + '  -  ', margins.left,margins.top);
    doc.setFontSize(14);
    doc.text(type_description, margins.left + (newX * 22), margins.top);
    doc.setFontSize(12);
    doc.setFont('times', 'italic');
    doc.text(desc_lines, margins.left, margins.top + 20);//+20?

    //images
    //console.log('spec_chart', images.spec_chart)
    doc.addImage(images.spec_chart, 'png', margins.left, 85, 720, 528);
    doc.addImage(images.picture, 'png', margins.left, 598, 720, 384);


    //footer
    doc.setFontSize(10);    
    doc.setFont('times', 'italic');
    doc.text(footer, 175, 1030);
    let footerW = doc.getStringUnitWidth(footer);
    console.log(footerW)

    //save pdf image
    doc.save(`${sensor}.pdf`);
}
export default generatePDF;

/*
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
doc.text(sensor + '  -  ', margins.left,margins.top);
//get location/width of this string so that type_description placed accordingly
let newX = doc.getStringUnitWidth(sensor + '  -  ');
doc.setFontSize(14);
doc.text(type_description, margins.left + (newX * 16), margins.top);

//break sensor description down based on text width so it fits within the page
doc.setFontSize(12);
doc.setFont('times', 'italic');
let desc_lines = doc.splitTextToSize(description, margins.width)
doc.text(desc_lines, margins.left, margins.top + 15);//+20?

//TODO bullets!!!
doc.text(bullet_text, 300, 80)

//ADD IMAGES FOR 1st Page
//const typeImage = require(`D:/DATA/Sensor/webApp/images/type/Type-${type}-Model.png`);
    //doc.addImage(typeImage.default, 'png', margins.left, 60, 252, 157);
    doc.addImage(images.type, 'png', margins.left, 60, 252, 157);
    doc.addImage(images.mech, 'png', 300, 145, 261, 72);
    doc.addImage(images.housing, 'png', margins.left, 230, 360, 162);
    doc.addImage(images.option, 'png', 407, 230, 153, 162);
    doc.addImage(images.connect, 'png', margins.left, 400, 360, 162);
    doc.addImage(images.conn_chart, 'png', 407, 400, 153, 92);
    doc.addImage(date, 'png', 407, 492, 153, 72);
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

//footer(centered on page)
doc.setFont('times', 'italic');
doc.text(footer, 132, 785)

//SECOND PAGE

//header
doc.addPage();
doc.setFont('times','bold');
doc.setFontSize(16);
doc.text(sensor + '  -  ', margins.left,margins.top);
doc.setFontSize(14);
doc.text(type_description, margins.left + (newX * 16), margins.top);
doc.setFontSize(12);
doc.setFont('times', 'italic');
doc.text(desc_lines, margins.left, margins.top + 15);//+20?

//images
doc.addImage(images.spec_chart, 'png', margins.left, 50, 540, 396);
doc.addImage(images.picture, 'png', margins.left, 450, 540, 320);


//footer
doc.setFontSize(10);    
doc.setFont('times', 'italic');
doc.text(footer, 132, 785);


//save pdf image
doc.save(`${sensor}.pdf`);

*/