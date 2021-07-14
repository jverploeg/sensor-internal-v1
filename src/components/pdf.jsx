import React, { useState, useEffect } from 'react';
import axios from 'axios';

//helper functions
import generatePDF from './pdfGenerator';

//assets
import date from '../images/DATECODE1-Model.png';

const PDF = (input) => {
    console.log(input, typeof(input))
    //destructure props!!!!!!!!!!!!!!!
    let temp = input.input;
    //const searchTerm = input;
    //TODO: check valid and type function

    //temp define search
    //var sensor = 'A47-18ADS-5KT21';
    
    console.log(input, temp)
    //shortcuts for testing random sensors
    if(temp === "a") {
        console.log('hey')
        var sensor = 'MFM7-EHS1-F5P21';//fits
    } else if(temp === 'b') {
        var sensor = 'M1VE-MRS-E5CP2';//issues with 2nd page
    } else if(temp === 'c') {
        var sensor = 'S63B-HS3-L5T21';//issues with 2nd page
    } else if(temp === 'd') {
        var sensor = 'A44-18ADS-OCR22';//fits
    } else if(temp === 'e') {
        var sensor = 'A63-37ADSD-51T21';//fits, but header description is close to spec_chart
    } else {
        var sensor = 'A47-18ADS-5KT21';
    }
    //console.log({sensor},'sdf')

    let segments = sensor.split('-');
    //console.log(segments)
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
    //images
    const [images, setImages] = useState({});

    const host = `http://192.168.1.118:3000`;

    //RERENDER PAGE ON TRIGGERS////////////////////
    useEffect(() => {
        //getSensor(input, type)
        getSensor(sensor, typeTemp);
    },[input])//change to type later

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
        console.log({sensor})
        try {
            const response = await Promise.all([
                axios.get(`${host}/sensorValid`, {params: {sensor}}),
                axios.get(`${host}/type`, {params: {type}}),
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
            <button onClick={() => generatePDF(sensorCode, sensorData, images)}>{sensorCode}</button>
            {!!images &&
                <div className="pdf-preview">
                    {/* <button onClick={() => print()}>{sensorCode}</button> */}
                    <div className="page1">
                        <div className="header" >
                            <span style={{fontSize:'16'}}><b>{sensorCode}  -  </b></span> <span style={{fontSize:'14'}}>{type_description}</span>
                            <br></br>
                            <span style={{fontSize:'12'}}><i>{description}</i></span>
                        </div>
                        {/* <div className="bullets">
                            <iframe src={require(`D:/DATA/Sensor/webApp/images/pdf_bullets/${char}.html`).default}></iframe>
                        </div>     */}
                        <div className="images">
                            <img className="type" src={images.type} alt='no image found'/>
                            <img className="mech" src={images.mech} alt='no image found'/>
                            <img className="housing" src={images.housing} alt='no image found'/>
                            <img className="option" src={images.option} alt='no image found'/>
                            <img className="connect" src={images.connect} alt='no image found'/>
                            <img className="conn_chart" src={images.conn_chart} alt='no image found'/>
                            <img className="date" src={date}></img>
                        </div>
                        {/* <div className="description">
                            <iframe src={require(`D:/DATA/Sensor/webApp/images/descriptions/${char}.html`).default}></iframe>
                        </div> */}
                        <div className='footer'>
                            <span style={{fontSize:'10'}}><i>Sensor Solutions * V: (970) 879-9900  F: (970) 879-9700 * www.sensorso.com * {rev}</i></span>
                        </div>           
                    </div>
                    <div className="page2">
                        <div className="header" >
                            <span style={{fontSize:'16'}}><b>{sensorCode}  -  </b></span> <span style={{fontSize:'14'}}>{type_description}</span>
                            <br></br>
                            <span style={{fontSize:'12'}}><i>{description}</i></span>
                        </div>
                        <div className="images">
                            <img className="spec_chart" src={images.spec_chart} alt='no image found'/>
                            <img className="picture" src={images.picture} alt='no image found'/>
                        </div>
                        <div className='footer'>
                            <span style={{fontSize:'10'}}><i>Sensor Solutions * V: (970) 879-9900  F: (970) 879-9700 * www.sensorso.com * {rev}</i></span>
                        </div>    
                    </div>
                </div>         
            }
        </div>
    )
}
export default PDF;