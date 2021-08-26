// FUNCTIONAL DEPENDENCIES
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// SUBCOMPONENTS
import generatePDF from './pdfGenerator';

// HELPERS
import html2text from '../helpers/html2text';
import check from '../helpers/check';
//import calls from '../helpers/PDF_requests';
import convert from '../helpers/convert';

// ASSETS
import date from '../images/DATECODE1-Model.png';

// VARIABLES
const host = `http://192.168.1.118:3000`;

const PDF = (input) => {
    //destructure props!!!!!!!!!!!!!!!
    let temp = input.input;//temp for testing
    //TODO: temp = temp.toUpperCase();
    //let sensor = input.input;

    //////////////////TESTING//////////////////////
    //shortcuts for testing random sensors
    if(temp === "a") {
        var sensor = 'MFM7-EHS1-F5P21';//
    } else if(temp === 'b') {
        var sensor = 'M1VE-MRS-E5CP2';//
    } else if(temp === 'c') {
        var sensor = 'X2161';//'A47-HS-RTCP2';//'CS1111'
    } else if(temp === 'd') {
        var sensor = 'CS1193';//'S38S-MRS-E5T21';//'CS1193'
    } else if(temp === 'e') {
        var sensor = 'CS1066';//'S63B-PHS-RGCD3';//'CS1066'
    } else if(temp === 'f') {
        var sensor = 'A63-37ADQO-LPCP4';//'CS1226'
    } else if(temp === '1') {
        var sensor = 'CS1045';
    } else if(temp === '2') {
        var sensor = 'CS1046';
    } else if(temp === '3') {
        var sensor = 'CS1047';
    } else if(temp === '4') {
        var sensor = 'CS1048';
    } else if(temp === '5') {
        var sensor = 'CS1049';
    } else if(temp === '6') {
        var sensor = 'CS1050';
    } else if(temp === '7') {
        var sensor = 'CS1051';
    } else if(temp === '8') {
        var sensor = 'CS1052';
    } else if(temp === '9') {
        var sensor = 'CS1053';
    } else {
        var sensor = temp;
    }
    /////////////////////////////////////////////



    //////////////STATE DECLARATION////////////////////////////////////////////////////
    //define which category of sensor 
    const [sensorType, setSensorType] = useState('');//options = ['catalog', 'custom', 'xproto', 'invalid']
    //define key information
    const [sensorCode, setSensorCode] = useState('');
    const [sensorData, setSensorData] = useState({});
    const [customData, setCustomData] = useState({});//different format than catalog
    const [protoData, setProtoData] = useState({});//different format than catalog (& custom?????)

    //breakdown of parts/components
    const [type, setType] = useState('');
    const [type_description, setTypeD] = useState('');
    const [housing, setHousing] = useState('');
    const [char, setChar] = useState('');
    const [connect, setConnect] = useState('');
    const [option, setOption] = useState('');
    const [rev, setRev] = useState('');
    const [description, setDescription] = useState('');

    //special states for combo images
    const [connChart, setConnChart] = useState('');
    const [specChart, setSpecChart] = useState('');
    const [picture, setPicture] = useState('');

    //images
    const [images, setImages] = useState({});

    //html
    const [bullets, setBullets] = useState([]);
    const [htmlRaw, setHtmlRaw] = useState({});

    //booleans for flipping
    const [valid, setValid] = useState(false); //true until proven false?
    //////////////////////////////////////////////////////////////////////////////////////
    
    const clearDOM = () => {
        setSensorType('');
        setSensorCode('');
        setSensorData({});
        setCustomData({});
        setProtoData({});

        setType('');
        setTypeD('');
        setHousing('');
        setChar('');
        setConnect('');
        setOption('');
        setRev('');
        setDescription('');

        setConnChart('');
        setSpecChart('');
        setPicture('');

        setImages({});

        setBullets([]);
        setHtmlRaw({});
        
        setValid(false);
    }



    /////////////////////RERENDER PAGE ON TRIGGERS////////////////////////////////////////////
    useEffect(() => { //////CHECK SENSOR VALIDITY ON INPUT CHANGE
        //clear all old states
        clearDOM();
        //check the input string
        let senstype = check.type(sensor); // 'catalog', 'custom', 'xproto'
        //set type
        setSensorType(senstype);
        //check if this is a valid sensor code
        let find = (senstype, sensor) => {
            check.valid(senstype, sensor)
            .then(result => {
                if(result){
                    console.log('valid')
                    setValid(true);
                    setSensorCode(sensor);
                } else {
                    console.log('not valid')
                    setValid(false);
                    //clearDOM();
                }
            })
        };
        find(senstype, sensor);
    },[sensor])

    //once code is set & confirmed valid, get data for sensor
    useEffect(() => {
        if(sensorCode.length > 1) {
            if (sensorType === 'catalog') {
                getSensor(sensorCode);
            } else if(sensorType === 'custom') {
                getSensor(sensorCode);
            } else if(sensorType === 'xproto') {
                //getProto(sensorCode);???
                getSensor(sensorCode);
            }
        }
    },[sensorCode])

    //catalog
    useEffect(() => {
        if(sensorData.part_number) {
            let segments = sensorCode.split('-');
            getType(segments[1]);
        }
    },[sensorData])

//TODO: COMBINE XPROTO AND CUSTOM STATES AND FUNCTIONS????

    //once we have custom data package, need type from char
    useEffect(() => {
        if(customData.part_number) {
            setChar(customData.char);
            getType(customData.char);
        }    
    },[customData])

    //once we have proto data package, need type from char
    useEffect(() => {
        if(protoData.xproto_part_number) {
            setChar(protoData.char);
            getType(protoData.char);
        }    
    },[protoData])

    //once we have sensor data package, call breakdown to split into relevant parts
    useEffect(() => {
        if(sensorType === 'catalog' && type.length > 1) {
            breakdown();
        }
        if(sensorType === 'custom' && type.length > 1) {
            customBreakdown();
        }
        if(sensorType === 'xproto' && type.length > 1) {
            protoBreakdown();
        }
    },[type]);
    
    //once all part states have been set, fetch images from server
    useEffect(() => {
        if(description.length > 1) {
            if(sensorType === 'catalog') {
                getImages();
            }else if(sensorType === 'custom'){
                getCustomImages();
            }else if(sensorType === 'xproto'){
                getProtoImages();
            }
        }
    },[description])//trigger on description change.(last state to be set in Breakdown)
    

    /////////////////////////////////////////////////////////////////////////////////////////


    //////////EVENT HANDLERS/////////////////////
    const getSensor = async(sensor) => {
        if(sensorType === 'catalog'){
            try {
                const { data } = await axios.get(`${host}/sensor/${sensor}`);
                setSensorData(data[0]);
            } catch (error) {
                console.log(error)
            }
        } else if(sensorType === 'custom'){
            try {
                const { data } = await axios.get(`${host}/custom/${sensor}`);
                setCustomData(data[0]);
            }
            catch (error) {
                console.log(error)
            }
        } else if(sensorType === 'xproto'){
            try {
                const { data } = await axios.get(`${host}/proto/${sensor}`);
                console.log('proto', data[0])
                setProtoData(data[0]);
            }
            catch (error) {
                console.log(error)
            }
        }
    }

    const getType = async(type) => {
        if(sensorType === 'catalog'){
            try {
                const { data } = await axios.get(`${host}/type`, {params: {type}});
                setType(sensorData.type);
                setTypeD(data[0].type_description);
            }
            catch (error) {
                console.log(error)
            }
        } else if(sensorType === 'custom') {
            try {
                const { data } = await axios.get(`${host}/ctype/${type}`);
                setType(data[0].type);
            }
            catch (error) {
                console.log(error)
            }
        } else if(sensorType === 'xproto') {
            try {
                const { data } = await axios.get(`${host}/ptype/${type}`);
                setType(data[0].type);
            }
            catch (error) {
                console.log(error)
            }
        }

    }

    /////////////DATA FORMATTING/////////////////
    const breakdown = () => {
        //break the search term down accordingly
        let segments = sensorCode.split('-');
        let H = segments[0];
        let C = segments[1];
        let sensor_code = sensorData.sensor_code;
        let splitOps = sensor_code.split(H); 
        let Conn = splitOps[1];
        let opt = splitOps[0].slice(C.length); //get accurate option code

        //set states for each component
        setHousing(H);
        setChar(C);
        setConnect(Conn);
        setOption(opt);
        setRev(sensorData.rev)
        setDescription(sensorData.title)
        //component-combo image file format
        setConnChart(Conn + '-' + C);
        setSpecChart(C + '-' + opt);
        setPicture(H + '-' + C);

        //format and set html object with text...
        getHtml(C);
    }

    const customBreakdown = () => {
        //destructure redefine data/props
        let housing = customData.housing;
        let conn = customData.connection;
        let opt = customData.option;

        //set states for each component
        setTypeD('');
        setHousing(housing);
        setConnect(conn);
        setOption(opt);
        setRev(customData.rev);
        setDescription(customData.title);
        //special custom states for inconsistent file-naming
        setConnChart(customData.conn_chart);
        setSpecChart(customData.spec_chart);
        setPicture(customData.picture);

        //getHTML
        getCustomHtml(char, sensorCode);
    }

    const protoBreakdown = () => {
        //destructure redefine data/props
        let housing = protoData.housing;
        let conn = protoData.connection;
        let opt = protoData.opt;

        //set states for each component
        setTypeD('');//follow similar design as custom...
        setHousing(housing);
        setConnect(conn);
        setOption(opt);
        setRev(protoData.rev);
        setDescription(protoData.description);
        //special custom states for inconsistent file-naming
        setConnChart(sensorCode);
        setSpecChart(sensorCode);
        setPicture(sensorCode);

        //getHTML
        getCustomHtml(char, sensorCode);
    }


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /*(8/26/21)
        IGNORE XPROTO FOR NOW>>>COME BACK TO AFTER DISCUSSION WITH DAVE and have clear direction moving forward
    */
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const getHtml = async(char) => {
        const responses = await Promise.allSettled([
            axios.get(`${host}/html/bullets/${char}`),
            axios.get(`${host}/html/description/${char}`),
        ])
        
        let results = [];
        for(let i = 0; i < responses.length; i++) {
            if(responses[i].status === 'fulfilled'){
                results.push(responses[i].value.data)
            } else {
                results.push(null)
            }
        }
        //convert correct html file
        let bullets = html2text(1, results[0]);
        setBullets(bullets);
        let raw = html2text(2, results[1]);
        setHtmlRaw(raw);

    }
    /////////////////////HTML/////////////////////////
    const getCustomHtml = async(char, sensor) => {
        const responses = await Promise.allSettled([
            axios.get(`${host}/html/bullets/${sensor}`),
            axios.get(`${host}/html/bullets/${char}`),
            axios.get(`${host}/html/description/${sensor}`),
            axios.get(`${host}/html/description/${char}`),
        ])
        
        let results = [];
        for(let i = 0; i < responses.length; i++) {
            if(responses[i].status === 'fulfilled'){
                results.push(responses[i].value.data)
            } else {
                results.push(null)
            }
        }

        //convert correct html file
        if(results[0] !== null){
            let bullets = html2text(1, results[0]);
            setBullets(bullets);
        } else {
            let bullets = html2text(1, results[1]);
            setBullets(bullets);
        }

        if(results[2] !== null){
            let raw = html2text(2, results[2]);
            setHtmlRaw(raw);
        } else {
            let raw = html2text(2, results[3]);
            setHtmlRaw(raw);
        }
    }
    /////////////////////////////////////////////

    //////////////////////////////////////////IMAGES//////////////////////////////////////////////////////////
    const getImages = async() => {
        const responses = await Promise.allSettled([
            axios.get(`${host}/images/type/Type-${type}-Model`, { responseType: 'arraybuffer' }),
            axios.get(`${host}/images/mech/${housing}-Mech-Model`, { responseType: 'arraybuffer' }),
            axios.get(`${host}/images/housing/${housing}-Model`, { responseType: 'arraybuffer' }),
            axios.get(`${host}/images/option/${option}-Model`, { responseType: 'arraybuffer' }),
            axios.get(`${host}/images/connect/${connect}-Model`, { responseType: 'arraybuffer' }),
            axios.get(`${host}/images/conn_charts/${connChart}-Model`, { responseType: 'arraybuffer' }),
            axios.get(`${host}/images/spec_charts/${specChart}-Model`, { responseType: 'arraybuffer' }),
            axios.get(`${host}/images/pictures/${picture}-Model`, { responseType: 'arraybuffer' }),
        ])
        let results = [];
        for(let i = 0; i < responses.length; i++) {
            if(responses[i].status === 'fulfilled'){
                results.push(responses[i].value.data)
            } else {
                results.push(null)
            }
        }
        let images = convert.images(results);
        setImages(images);
    }
    const getCustomImages = async() => {
        const responses = await Promise.allSettled([
            axios.get(`${host}/images/type/Type-${type}-Model`, { responseType: 'arraybuffer' }),
            axios.get(`${host}/images/mech/${housing}-Mech-Model`, { responseType: 'arraybuffer' }),
            axios.get(`${host}/images/housing/${housing}-Model`, { responseType: 'arraybuffer' }),
            axios.get(`${host}/images/option/${option}-Model`, { responseType: 'arraybuffer' }),
            axios.get(`${host}/images/connect/${connect}-Model`, { responseType: 'arraybuffer' }),
            axios.get(`${host}/images/conn_charts/${connChart}-Model`, { responseType: 'arraybuffer' }),
            axios.get(`${host}/images/spec_charts/${specChart}-Model`, { responseType: 'arraybuffer' }),
            axios.get(`${host}/images/pictures/${picture}-Model`, { responseType: 'arraybuffer' }),
        ])
        let results = [];
        for(let i = 0; i < responses.length; i++) {
            if(responses[i].value){
                results.push(responses[i].value.data)//value is an object
            } else {
                results.push(null)
            }
        }
        let images = convert.images(results);
        setImages(images);
    }
    const getProtoImages = async() => {
        const responses = await Promise.allSettled([
            axios.get(`${host}/images/type/Type-${type}-Model`, { responseType: 'arraybuffer' }),
            axios.get(`${host}/images/mech/${housing}-Mech-Model`, { responseType: 'arraybuffer' }),
            axios.get(`${host}/images/housing/${housing}-Model`, { responseType: 'arraybuffer' }),
            axios.get(`${host}/images/option/${option}-Model`, { responseType: 'arraybuffer' }),
            axios.get(`${host}/images/connect/${connect}-Model`, { responseType: 'arraybuffer' }),
            axios.get(`${host}/images/conn_charts/${connChart}-Model`, { responseType: 'arraybuffer' }),
            axios.get(`${host}/images/spec_charts/${specChart}-Model`, { responseType: 'arraybuffer' }),
            axios.get(`${host}/images/pictures/${picture}-Model`, { responseType: 'arraybuffer' }),
        ])
        let results = [];
        for(let i = 0; i < responses.length; i++) {
            if(responses[i].value){
                results.push(responses[i].value.data)//value is an object
            } else {
                results.push(null)
            }
        }
        let images = convert.images(results);
        setImages(images);
    }
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////




    //DOM
    return (
        <div>
            
            {(valid === true) &&
            <div className="overview">
            <button onClick={() => generatePDF(sensorType, sensorCode, type_description, sensorData, customData, images, bullets)}>{sensorCode}</button>
                <div className="pdf-preview">
                    <div className="page1" id="page1">
                        {(sensorType === 'catalog') && 
                            <div className="header" >
                                <span style={{fontSize:'14pt'}}><b>{sensorCode}  -  </b></span> <span style={{fontSize:'12pt'}}><b>{type_description}</b></span>
                                <br></br>
                                <span style={{fontSize:'12pt'}}><i>{description}</i></span>
                            </div>
                        }
                        {(sensorType === 'custom') && 
                            <div className="headerCust" >
                                <span style={{fontSize:'14pt'}}><b>{sensorCode}  -  </b></span> <span style={{fontSize:'12pt'}}><i>{description}</i></span>
                                {/* <br></br>
                                <span style={{fontSize:'12pt'}}><i>{description}</i></span> */}
                            </div>
                        }

                        <div className="bullets">
                            <ul className="bullets2">
                                {!!bullets && bullets.map((item,index) => (
                                    <li style={{fontSize:'12pt'}}>
                                    <i>{item}</i>  
                                    </li>
                                ))}
                            </ul>
                        </div>    
                        <div className="images">
                            <img className="type" src={images.type} alt={`type/Type-${type}-Model not found`}/>
                            <img className="mech" src={images.mech} alt={`mech/${housing}-Mech-Model not found`}/>
                            <img className="housing" src={images.housing} alt={`housing/${housing}-Model not found`}/>
                            <img className="option" src={images.option} alt={`option/${option}-Model not found`}/>
                            <img className="connect" src={images.connect} alt={`connect/${connect}-Model not found`}/>
                            <img className="conn_chart" src={images.conn_chart} alt={`type/conn_charts/${connChart}-Model not found`}/>
                            <img className="date" src={date}></img>
                        </div>
                        
                        <div className="description" id="description" dangerouslySetInnerHTML={convert.createMarkup(htmlRaw)}/>

                        <div className='footer'>
                            <span style={{fontSize:'10pt'}}><i>Sensor Solutions * V: (970) 879-9900  F: (970) 879-9700 * www.sensorso.com * Rev {rev}</i></span>
                        </div>           
                    </div>
                    <div className="page2" id="page2">
                        {(sensorType === 'catalog') && 
                            <div className="header" >
                                <span style={{fontSize:'14pt'}}><b>{sensorCode}  -  </b></span> <span style={{fontSize:'12pt'}}><b>{type_description}</b></span>
                                <br></br>
                                <span style={{fontSize:'12pt'}}><i>{description}</i></span>
                            </div>
                        }
                        {(sensorType === 'custom') && 
                            <div className="headerCust" >
                                <span style={{fontSize:'14pt'}}><b>{sensorCode}  -  </b></span> <span style={{fontSize:'12pt'}}><i>{description}</i></span>
                                {/* <br></br>
                                <span style={{fontSize:'12pt'}}><i>{description}</i></span> */}
                            </div>
                        }
                        <div className="images">
                            <img className="spec_chart" src={images.spec_chart} alt={`spec_charts/${char}-${option}-Model not found`}/>
                            <img className="picture" src={images.picture} alt={`pictures/${housing}-${char}-Model not found`}/>
                        </div>
                        <div className='footer'>
                            <span style={{fontSize:'10pt'}}><i>Sensor Solutions * V: (970) 879-9900  F: (970) 879-9700 * www.sensorso.com * Rev {rev}</i></span>
                        </div>    
                    </div>
                </div>   
            </div>            
            }
            {(valid === false) && (sensor.length > 0) &&
                <div>
                    <span>NOT A VALID SENSOR</span>
                </div>    
            }    
        </div>
      
    )
}
export default PDF;