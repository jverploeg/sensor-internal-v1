import React, { useState, useEffect } from 'react';
import axios from 'axios';

//pdf helpers
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
//subcomponents, depedencies

const PDF = (input) => {
    //destructure props
    const searchTerm = input;
    //TODO: check valid and type function

    //temp define search
    let sensor = 'A47-18ADS-5KT21';
    let segments = sensor.split('-');
    let typeTemp = segments[1];//this wont work for cs, proto


    //define state
    const [sensorCode, setSensorCode] = useState('');
    const [sensorData, setSensorData] = useState({});
    //part states
    const [type, setType] = useState('');
    const [type_description, setTypeD] = useState('');
    const [housing, setHousing] = useState('');
    const [char, setChar] = useState('');
    const [connect, setConnect] = useState('');
    const [option, setOption] = useState('');
    const [rev, setRev] = useState('');
    const [description, setDescription] = useState('');

    //render/useEffect
    //on prop/input change, call get sensor
    // useEffect(() => {
    //     //parse to get type
    // },[input])
    useEffect(() => {
        //getSensor(input, type)
        getSensor(sensor, typeTemp);
    },[input])//change to type later

    //check that state is changing
    useEffect(() => {
        console.log({sensorCode, sensorData})
        //breakdown(sensorData, sensorCode);
        if(sensorData.length > 1) {
            breakdown(sensorData, sensorCode);
        }    
    },[sensorData])

    //event handlers
    const getSensor = async(sensor, type) => {
        try {
            const response = await Promise.all([
                axios.get(`http://192.168.1.118:3000/sensorValid`, {params: {sensor}}),
                axios.get(`http://192.168.1.118:3000/type`, {params: {type}}),
            ]);
            const data = response.map((response) => response.data);
            let output = data.flat();
            setSensorCode(sensor);
            setSensorData(output);
            //generatePDF(sensor, output);
        } catch (error) {
            console.log(error)
        }
    }
    const breakdown = (data, sensor) => {
        //break retrieved data into relevent variables
                //destructure redefine data/props
                console.log(data)
                let specs = data[0];
                setTypeD(data[1].type_description);
                //let type_description = data[1].type_description;
            
            
                //TODO: either here or in parser, logic to differentiate between 3 sensor types...
            
                //break the search term down accordingly
                let segments = sensor.split('-');
                setHousing(segments[0]);
                let housing = segments[0];
                setChar(segments[1]);
                setType(specs.type);
                let sensor_code = specs.sensor_code;
                let splitOps = sensor_code.split(housing); 
                setConnect(splitOps[1]);
                let opt = splitOps[0].slice(char.length); //get accurate option code
                setOption(opt);
                setRev(specs.rev)
                setDescription(specs.title)
                //let footer = `Sensor Solutions * V: (970) 879-9900  F: (970) 879-9700 * www.sensorso.com * ${revision} `;
    }
    useEffect(() => {
        console.log({type})
    },[type])

    const print = () => {
        var page = document.getElementsByClassName("page1");
        console.log(page)
        html2canvas(page[0])
        .then((canvas) => {
        const imgData = canvas.toDataURL('image/jpeg');
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'pt', //points
          format: 'letter', //default is a4
        });
        const imgProps= pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        console.log({pdfWidth, pdfHeight})
        //pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.addImage(imgData, 'JPEG', 0, 0, 612, 792);
        pdf.save('download.pdf');
      });
        // html2canvas(page[0], {
        //   //dpi: 300, // Set to 300 DPI
        //   //scale: 3, // Adjusts your resolution
        //   onrendered: function(canvas) {
        //     var img = canvas.toDataURL("image/jpeg", 1);
        //     console.log(img)
        //     const doc = new jsPDF({
        //         orientation:'portrait',
        //         unit: 'pt', //points
        //         format: 'letter', //default is a4
        //     });
        //     doc.addImage(img, 'JPEG', 0, 0, 612, 792);
        //     doc.save('sample-file.pdf');
        //   }
        // });
    }
    //split pages into subcomponenets????
    {/* <img src={require(`file:///D:/DATA/Sensor/webApp/images/housing/S8-Model.png`).default}></img> */}
    //DOM
    return (
        <div>
            {!!description &&
                <div className="pdf-preview2">
                    <button onClick={() => print()}>{sensorCode}</button>
                    <div className="page1">
                        <div className="header" >
                            <span style={{fontSize:'16pt'}}><b>{sensorCode}  -  </b></span> <span style={{fontSize:'14pt'}}>{type_description}</span>
                            <br></br>
                            <span style={{fontSize:'12pt'}}><i>{description}</i></span>
                        </div>
                        <div className="images">
                            <img className="type" src={require(`D:/DATA/Sensor/webApp/images/type/Type-${type}-Model.png`).default}></img>
                        </div>    
                    </div>
                    {/* <div className="page2">

                    </div> */}
                </div>      
            }
        </div>
    )
}
export default PDF;