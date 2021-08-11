// FUNCTIONAL DEPENDENCIES
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// SUBCOMPONENTS
import generatePDF from './pdfGenerator';

// HELPERS
import html2text from '../helpers/html2text';
import check from '../helpers/check';
import calls from '../helpers/PDF_requests';
import convert from '../helpers/convert';

// ASSETS
import date from '../images/DATECODE1-Model.png';

// VARIABLES
const host = `http://192.168.1.118:3000`;

const PDF = (input) => {
    //destructure props!!!!!!!!!!!!!!!
    let temp = input.input;//temp for testing
    //let sensor = input.input;

    //////////////////TESTING//////////////////////
    //shortcuts for testing random sensors
    if(temp === "a") {
        var sensor = 'MFM7-EHS1-F5P21';//
    } else if(temp === 'b') {
        var sensor = 'M1VE-MRS-E5CP2';//
    } else if(temp === 'c') {
        var sensor = 'CS1111';//'A47-HS-RTCP2';//'CS1111'
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
    //breakdown of parts/components
    const [type, setType] = useState('');
    const [type_description, setTypeD] = useState('');
    //const [type_description2, setTypeD2] = useState('');//for option 2 with custom
    const [housing, setHousing] = useState('');
    const [char, setChar] = useState('');
    const [connect, setConnect] = useState('');
    const [option, setOption] = useState('');
    const [rev, setRev] = useState('');
    const [description, setDescription] = useState('');
    const [description2, setDescription2] = useState('');//for option 2 with custom
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

        setType('');
        setTypeD('');
        //setTypeD2('');
        setHousing('');
        setChar('');
        setConnect('');
        setOption('');
        setRev('');
        setDescription('');
        setDescription2('');

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
        console.log(senstype, sensor);

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

    // //if valid state changes, continue with data retrieval
    // useEffect(() => {
    //     if(valid){
    //         setSensorCode(sensor);//input string
    //     } 
    //     else{
    //         setSensorCode('');//set code to empty string
    //     }
    // },[sensor,valid])

    //once code is set, get data
    useEffect(() => {
        if(sensorCode.length > 1) {
            if (sensorType === 'catalog') {
                getSensor(sensorCode);
            } else if(sensorType === 'custom') {
                getSensor(sensorCode);
                //getCustom(sensorCode);
            } else if(sensorType === 'xproto') {
                //TODO LATER: implement logic for xproto sensors
                //getProto
            }
        }
    },[sensorCode])

    
    useEffect(() => {
        if(sensorData.part_number) {
            let segments = sensorCode.split('-');
            getType(segments[1]);
        }
    },[sensorData])
    //once we have custom data package, call special breakdown to split into relevant parts
    useEffect(() => {
        if(customData.part_number) {
            setChar(customData.closest_char);
            getType(customData.closest_char);
        }    
    },[customData])

    //once we have sensor data package, call breakdown to split into relevant parts
    useEffect(() => {
        if(sensorType === 'catalog' && type.length > 1) {
            breakdown();//sensorData, sensorCode);
        }
        if(sensorType === 'custom' && type.length > 1) {
            customBreakdown();
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
                //getProtoImages();
            }
        }
    },[description])//trigger on description change.(last state to be set in Breakdown)
    //getCustomImages

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
                console.log({data})
                setCustomData(data[0]);
            }
            catch (error) {
                console.log(error)
            }
        }

    }
    const getType = async(type) => {
        if(sensorType === 'custom') {
            try {
                console.log(type)
                const { data } = await axios.get(`${host}/ctype/${type}`);
                setType(data[0].type);
            }
            catch (error) {
                console.log(error)
            }
        } else {
            try {
                const { data } = await axios.get(`${host}/type`, {params: {type}});
                setType(sensorData.type);
                setTypeD(data[0].type_description);
            }
            catch (error) {
                console.log(error)
            }
        }

    }
    const getImages = async() => {
        const responses = await Promise.allSettled([
            axios.get(`${host}/images/type/Type-${type}-Model`, { responseType: 'arraybuffer' }),
            axios.get(`${host}/images/mech/${housing}-Mech-Model`, { responseType: 'arraybuffer' }),
            axios.get(`${host}/images/housing/${housing}-Model`, { responseType: 'arraybuffer' }),
            axios.get(`${host}/images/option/${option}-Model`, { responseType: 'arraybuffer' }),
            axios.get(`${host}/images/connect/${connect}-Model`, { responseType: 'arraybuffer' }),
            axios.get(`${host}/images/conn_charts/${connect}-${char}-Model`, { responseType: 'arraybuffer' }),
            axios.get(`${host}/images/spec_charts/${char}-${option}-Model`, { responseType: 'arraybuffer' }),
            axios.get(`${host}/images/pictures/${housing}-${char}-Model`, { responseType: 'arraybuffer' }),
        ])
        let results = [];
        for(let i = 0; i < responses.length; i++) {
            if(responses[i].status === 'fulfilled'){
                results.push(responses[i].value.data)//value is an object
            } else {
                results.push(null)
            }
        }
        let images = convert.images(results);
        setImages(images);
    }
    // const getCustomImages = async() => {
    //     //call all the waterfalls to get an image for each section
    //     const response = await Promise.all([
    //         calls.getCustomImageType(sensorCode, type),
    //         calls.getCustomImageMech(sensorCode, housing),
    //         calls.getCustomImageHousing(sensorCode, housing),
    //         calls.getCustomImageOption(sensorCode, option),
    //         calls.getCustomImageConnect(sensorCode, connect),
    //         calls.getCustomImageConnChart(sensorCode, connect, char),
    //         calls.getCustomImageSpec(sensorCode, char, option),
    //         calls.getCustomImagePicture(sensorCode, housing, char, type),
    //     ]);
    //     const data = response.map((response) => response.data);
    //     let images = convert.images(data);
    //     setImages(images);
    // }
    const getCustomImages = async() => {
        //call all the waterfalls to get an image for each section
        const responses = await Promise.allSettled([
            calls.getCustomImageType(sensorCode, type),
            calls.getCustomImageMech(sensorCode, housing),
            calls.getCustomImageHousing(sensorCode, housing),
            calls.getCustomImageOption(sensorCode, option),
            calls.getCustomImageConnect(sensorCode, connect),
            calls.getCustomImageConnChart(sensorCode, connect, char),
            calls.getCustomImageSpec(sensorCode, char, option),
            calls.getCustomImagePicture(sensorCode, housing, char, type),
        ]);
        console.log(responses)//different than catalog. all fulfilled, some vals are undefined....
        let results = [];
        for(let i = 0; i < responses.length; i++) {
            if(responses[i].value){
                results.push(responses[i].value.data)//value is an object
            } else {
                results.push(null)
            }
        }
        console.log(results)
        let images = convert.images(results);
        setImages(images);
    }
    /////////////////////////////////////////////


    /////////////DATA FORMATTING/////////////////
    const breakdown = (data, sensor) => {
        //break the search term down accordingly
        let segments = sensorCode.split('-');
        let housing = segments[0];
        setHousing(segments[0]);
        let char = segments[1];
        setChar(segments[1]);
        let sensor_code = sensorData.sensor_code;
        let splitOps = sensor_code.split(housing); 
        setConnect(splitOps[1]);
        let opt = splitOps[0].slice(char.length); //get accurate option code
        setOption(opt);
        setRev(sensorData.rev)
        setDescription(sensorData.title)

        //format and set html object with text...
        let bullets = html2text(1, char);
        setBullets(bullets);
        //get raw html and perform minor regex changes
        let raw = html2text(3, char);
        setHtmlRaw(raw);
    }

    const customBreakdown = (sensor) => {
        //destructure redefine data/props
        setTypeD('');
        let housing = customData.closest_housing;
        setHousing(housing);
        let conn = customData.closest_connection;
        setConnect(conn);
        let opt = customData.closest_option;
        setOption(opt);
        setRev(customData.rev);
        setDescription(customData.title);

        //option2 for highlighting catalog code after csxxxx
        //DAVE DIDN"T CARE FOR THIS
        // let temp = customData.title;
        // temp = temp.split(', ');
        // var type_description2 = temp[0];
        // temp.unshift();
        // var description2 = temp.join(', ');
        // setTypeD2(type_description2);
        // setDescription2(description2);

        //getCustomHtml
        getCustomHtml(char, sensorCode);
    }
    const getCustomHtml = async(char, sensor) => {
        try {
            const response = await Promise.all([
                calls.checkBullets(sensor, char),
                calls.checkDescription(sensor, char),
            ])
            //convert
            let bullets = html2text(1, null, response[0]);
            setBullets(bullets);
            let raw = html2text(3, null, response[1]);//
            setHtmlRaw(raw);
        } catch(error) {
            console.log(error);
        }    
    }
    /////////////////////////////////////////////





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
                            <img className="conn_chart" src={images.conn_chart} alt={`type/conn_charts/${connect}-${char}-Model not found`}/>
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
//https://stackoverflow.com/questions/48215965/how-to-display-an-array-of-strings-in-react-component

//https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml
