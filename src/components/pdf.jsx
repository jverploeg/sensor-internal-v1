import React, { useState, useEffect } from 'react';
import axios from 'axios';

//helper functions
import generatePDF from './pdfGenerator';
import html2text from './html2text';
//import customPdf from './customPdf';
import checkType from './checkType';

//assets
import date from '../images/DATECODE1-Model.png';

const PDF = (input) => {
    const host = `http://192.168.1.118:3000`;
    //destructure props!!!!!!!!!!!!!!!
    let temp = input.input;
    //let sensor = input.input;


    //temp define search
    //var sensor = 'A47-18ADS-5KT21';
    
    //console.log(input, temp)
    //shortcuts for testing random sensors
    if(temp === "a") {
        console.log('hey')
        var sensor = 'MFM7-EHS1-F5P21';//fits
    } else if(temp === 'b') {
        var sensor = 'M1VE-MRS-E5CP2';//issues with 2nd page
    } else if(temp === 'c') {
        var sensor = 'CS1111';
    } else if(temp === 'd') {
        var sensor = 'A44-18ADS-OCR22';//fits
    } else if(temp === 'e') {
        var sensor = 'A63-37ADSD-51T21';//fits, but header description is close to spec_chart
    } else {
        var sensor = 'A47-18ADS-5KT21';
    }


    //define state
    const [sensorType, setSensorType] = useState('');
    //define key data pieces
    const [sensorCode, setSensorCode] = useState('');
    const [sensorData, setSensorData] = useState({});
    //breakdown of part states
    const [type, setType] = useState('');
    const [type_description, setTypeD] = useState('');
    const [housing, setHousing] = useState('');
    const [char, setChar] = useState('');
    const [connect, setConnect] = useState('');
    const [option, setOption] = useState('');
    const [rev, setRev] = useState('');
    const [description, setDescription] = useState('');
    //images
    const [images, setImages] = useState({});
    //html
    const [html, setHtml] = useState({});

    

    //RERENDER PAGE ON TRIGGERS////////////////////
    useEffect(() => {
        let senstype = checkType(sensor); // 'standard', 'custom', 'xproto'
        console.log(senstype)
        if (senstype === 'standard') {
            //breakdown the 3 part code
            let segments = sensor.split('-');
            let typeTemp = segments[1];
            //getSensor(temp, type) ?typeTemp works for this implementation
            getSensor(sensor, typeTemp);
        } else if(senstype === 'custom') {
            getCustom(sensor);
        } else if(senstype === 'xproto') {
            //TODO LATER: implement logic for xproto sensors
            //getProto
        }
    },[input])//change to type later? no?

    //once we have sensor data package, call breakdown to split into relevant parts
    useEffect(() => {
        //console.log({sensorCode, sensorData})
        //breakdown(sensorData, sensorCode);
        if(sensorData.length > 1) {
            breakdown(sensorData, sensorCode);
        }    
    },[sensorData])

    //once all part states have been set, fetch images from server
    useEffect(() => {
        //because this isnt the top level component, description isnt created on initial render, only after searching
        //even though description state is set as empty string, this gets called on render...
        //make sure description has content before calling getimages
        if(description.length > 1) {
            getImages();
        }
    },[description])//trigger on description change.(last state to be set in Breakdown)

    //event handlers
    const getSensor = async(sensor, type) => {
        //console.log({sensor})
        try {
            const response = await Promise.all([
                axios.get(`${host}/sensorValid`, {params: {sensor}}),
                axios.get(`${host}/type`, {params: {type}}),
            ]);
            const data = response.map((response) => response.data);
            let output = data.flat(); //DO WE NEED THE WHOLE ROW?
            //console.log(sensor, output)
            setSensorCode(sensor);
            setSensorData(output);
            //generatePDF(sensor, output);
        } catch (error) {
            console.log(error)
        }
    }
    const getCustom = async(sensor) => {
        try {
            const response = await axios.get(`${host}/custom/${sensor}`);
            //setSensor(response.data)
            console.log(response.data);//[0]);
            //Sensitive Either Pole Hall Switch, 38 G, supply filter, npn 5k pull up resistor, Aluminum 15/32-32 x 1" housing, 3 pin Deutsch DT with 5 inch 20 AWG XLPE
        }
        catch (error) {
            console.log(error)
        }
    }





    const breakdown = (data, sensor) => {
        //break retrieved data into relevent variables

        //TODO: either here or in parser, logic to differentiate between 3 sensor types...


        //destructure redefine data/props
        let specs = data[0];
        setTypeD(data[1].type_description);
        //break the search term down accordingly
        let segments = sensor.split('-');
        let char = segments[1];
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

        let bullets = html2text(1, char);
        let desc = html2text(2, char);
        let template = {
            bullets: bullets, 
            desc: desc,
        }
        console.log(template)
        setHtml(template);
    }

    //Get images from router
    const getImages = async() => {
        let template = {
            type: '',
            mech: '',
            housing: '',
            option: '',
            connect: '',
            conn_chart: '',
            spec_chart: '',
            picture: '',
        }
        console.log(html.bullets)
        try {
            //Promise.all to get all the images from server
            const response = await Promise.all([
                axios.get(`${host}/images/type/Type-${type}-Model`, { responseType: 'arraybuffer' }),
                axios.get(`${host}/images/mech/${housing}-Mech-Model`, { responseType: 'arraybuffer' }),
                axios.get(`${host}/images/housing/${housing}-Model`, { responseType: 'arraybuffer' }),
                axios.get(`${host}/images/option/${option}-Model`, { responseType: 'arraybuffer' }),
                axios.get(`${host}/images/connect/${connect}-Model`, { responseType: 'arraybuffer' }),
                axios.get(`${host}/images/conn_charts/${connect}-${char}-Model`, { responseType: 'arraybuffer' }),
                axios.get(`${host}/images/spec_charts/${char}-${option}-Model`, { responseType: 'arraybuffer' }),
                axios.get(`${host}/images/pictures/${housing}-${char}-Model`, { responseType: 'arraybuffer' }),
            ]);
            const data = response.map((response) => response.data);
            let convertedArray = [];
            //iterate through array buffer and convert to base64
            for(let i = 0; i < data.length; i++){
                let base64 = btoa(
                    new Uint8Array(data[i]).reduce(
                          (data, byte) => data + String.fromCharCode(byte),
                          '',
                    ),
                );
                //append data format declaration and add to object;
                convertedArray[i] = ( "data:;base64," + base64 );
            }
            //save to template... -> better way to do this????
            template.type = convertedArray[0];
            template.mech = convertedArray[1];
            template.housing = convertedArray[2];
            template.option = convertedArray[3];
            template.connect = convertedArray[4];
            template.conn_chart = convertedArray[5];
            template.spec_chart = convertedArray[6];
            template.picture = convertedArray[7];
            //...

            //set image state
            setImages(template);
        } catch (error) {
            console.log(error)
        }
    }


    //DOM
    return (
        <div>
            {/* <button onClick={() => print()}>{sensorCode}</button> */}
            <button onClick={() => generatePDF(sensorCode, sensorData, images, html)}>{sensorCode}</button>
            {!!images &&
                <div className="pdf-preview">
                    {/* <button onClick={() => print()}>{sensorCode}</button> */}
                    <div className="page1">
                        <div className="header" >
                            <span style={{fontSize:'14pt'}}><b>{sensorCode}  -  </b></span> <span style={{fontSize:'12pt'}}><b>{type_description}</b></span>
                            <br></br>
                            <span style={{fontSize:'12pt'}}><i>{description}</i></span>
                        </div>
                        <div className="bullets">
                            <ul className="bullets2">
                                {!!html.bullets && html.bullets.map((item,index) => (
                                    <li style={{fontSize:'12pt'}}>
                                    <i>{item}</i>  
                                    </li>
                                ))}
                            </ul>
                        </div>    
                        <div className="images">
                            <img className="type" src={images.type} alt='no image found'/>
                            <img className="mech" src={images.mech} alt='no image found'/>
                            <img className="housing" src={images.housing} alt='no image found'/>
                            <img className="option" src={images.option} alt='no image found'/>
                            <img className="connect" src={images.connect} alt='no image found'/>
                            <img className="conn_chart" src={images.conn_chart} alt='no image found'/>
                            <img className="date" src={date}></img>
                        </div>
                        <div className="description">
                            <p style={{fontSize:'10pt'}}>{html.desc}</p>
                        </div>
                        <div className='footer'>
                            <span style={{fontSize:'10pt'}}><i>Sensor Solutions * V: (970) 879-9900  F: (970) 879-9700 * www.sensorso.com * {rev}</i></span>
                        </div>           
                    </div>
                    <div className="page2">
                        <div className="header" >
                            <span style={{fontSize:'14pt'}}><b>{sensorCode}  -  </b></span> <span style={{fontSize:'12pt'}}>{type_description}</span>
                            <br></br>
                            <span style={{fontSize:'12pt'}}><i>{description}</i></span>
                        </div>
                        <div className="images">
                            <img className="spec_chart" src={images.spec_chart} alt='no image found'/>
                            <img className="picture" src={images.picture} alt='no image found'/>
                        </div>
                        <div className='footer'>
                            <span style={{fontSize:'10pt'}}><i>Sensor Solutions * V: (970) 879-9900  F: (970) 879-9700 * www.sensorso.com * {rev}</i></span>
                        </div>    
                    </div>
                </div>         
            }
        </div>
    )
}
export default PDF;