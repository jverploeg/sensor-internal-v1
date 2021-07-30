import React, { useState, useEffect } from 'react';
import axios from 'axios';

//helper functions
import generatePDF from './pdfGenerator';
import generatePDF2 from './pdfGold';
//import html2text from './html2text';
import html2text from '../helpers/html2text';
import CustomHTML from './customHtml2text';
import checkType from './checkType';

import calls from './axiosCalls';

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
    } else {
        var sensor = 'A47-18ADS-5KT21';
    }

    //catalog issues
    /*
        'S63B-PHS-RGCD3' -> paragraphs not split for description
        'A63-37ADQO-LPCP4' -> weird symbols(diamond w/ ?) <?>

    */


    //define which category of sensor ['standard', 'custom', 'xproto']
    const [sensorType, setSensorType] = useState('');
    //define key data pieces
    const [sensorCode, setSensorCode] = useState('');
    const [customData, setCustomData] = useState({});
    const [sensorData, setSensorData] = useState({});
    //breakdown of part states
    const [type, setType] = useState('');
    const [type_description, setTypeD] = useState('');
    const [type_description2, setTypeD2] = useState('');
    const [housing, setHousing] = useState('');
    const [char, setChar] = useState('');
    const [connect, setConnect] = useState('');
    const [option, setOption] = useState('');
    const [rev, setRev] = useState('');
    const [description, setDescription] = useState('');
    const [description2, setDescription2] = useState('');
    //images
    const [images, setImages] = useState({});
    //html
    //const [html, setHtml] = useState({});
    const [bullets, setBullets] = useState([]);
    const [htmlRaw, setHtmlRaw] = useState({});

    

    //RERENDER PAGE ON TRIGGERS////////////////////
    useEffect(() => {
        let senstype = checkType(sensor); // 'standard', 'custom', 'xproto'
        //set state
        setSensorType(senstype);

        if (senstype === 'catalog') {
            //breakdown the 3 part code
            let segments = sensor.split('-');
            let typeTemp = segments[1];
            getSensor(sensor, typeTemp);
        } else if(senstype === 'custom') {
            setSensorCode(sensor);
            getCustom(sensor);
        } else if(senstype === 'xproto') {
            //TODO LATER: implement logic for xproto sensors
            //getProto
        }
    },[input])//change to type later? no?

    //once we have sensor data package, call breakdown to split into relevant parts
    useEffect(() => {
        //console.log({sensorData})
        if(sensorData.length > 1) {
            //setCustomData({});//reset custom
            breakdown(sensorData, sensorCode);
        }
    },[sensorData])
    //once we have custom data package, call special breakdown to split into relevant parts
    useEffect(() => {
        //console.log({customData})
        if(customData.length > 0) {
            //setSensorData({});
            customBreakdown(customData);
        }    
    },[customData])

    //once all part states have been set, fetch images from server
    useEffect(() => {
        if(description.length > 1) {
            console.log(sensorType)
            if(sensorType === 'catalog') {
                getImages();
            }else if(sensorType === 'custom'){
                //need to get type for image selection first
                getType(char);
                //getCustomImages(); --> called after we get type.. refactor now that we have axios understood better
            }else if(sensorType === 'xproto'){
                //getProtoImages();
            }
        }
    },[description])//trigger on description change.(last state to be set in Breakdown)

    //getCustomImages
    useEffect(() => {
        if(sensorType === 'custom' && type.length > 1) {
            getCustomImages();
        }
    },[type]);

    // useEffect(() => {
    //     console.log(descArray)
    // },[html])


    //event handlers
    const getSensor = async(sensor, type) => {
        try {
            const response = await Promise.all([
                axios.get(`${host}/sensor/${sensor}`),
                axios.get(`${host}/type`, {params: {type}}),
            ]);
            const data = response.map((response) => response.data);
            let output = data.flat(); //DO WE NEED THE WHOLE ROW? --> yes it helps avoid wierd formatting as a data response
            setSensorCode(sensor);
            setSensorData(output);
        } catch (error) {
            console.log(error)
        }
    }
    const getCustom = async(sensor) => {
        try {
            const response = await axios.get(`${host}/custom/${sensor}`);
            setCustomData(response.data);
        }
        catch (error) {
            console.log(error)
        }
    }
    const getType = async(input) => {
        try {
            const response = await axios.get(`${host}/ctype/${input}`);
            let tempType = response.data[0].type;
            setType(tempType);
        }
        catch (error) {
            console.log(error)
        }
    }




    const breakdown = (data, sensor) => {
        //break retrieved data into relevent variables

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

        //format and set html object with text...
        let bullets = html2text(1, char);
        setBullets(bullets);
        //let desc = html2text(2, char); not using
        //get html to see if we can directly use
        let raw = html2text(3, char);
        setHtmlRaw(raw);
        //set formatted html for generator
        // let template = {
        //     bullets: bullets, 
        //     desc: desc,
        // }
        
    }

    const customBreakdown = (sensor) => {
        //destructure redefine data/props
        let specs = sensor[0];
        setTypeD('');//dont need type description, its part of the title for custom sensors...
        let char = specs.closest_char;
        setChar(char);
        let housing = specs.closest_housing;
        setHousing(housing);
        let conn = specs.closest_connection;
        setConnect(conn);
        let opt = specs.closest_option;
        setOption(opt);
        setRev(specs.rev);
        setDescription(specs.title);

        //option2 for highlighting catalog code after csxxxx
        let temp = specs.title;
        temp = temp.split(', ');
        var type_description2 = temp[0];
        temp.unshift();
        var description2 = temp.join(', ');
        setTypeD2(type_description2);
        setDescription2(description2);

        //getCustomHtml
        getCustomHtml(char, sensorCode);
    }
    const createMarkup = (input) => {
        return {__html: input};
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
            //let desc = CustomHTML(2, response[1]);//converting to text...
            let raw = html2text(3, null, response[1]);//
            setHtmlRaw(raw);
            //set object template
            // let template = {
            //     bullets: bullets, 
            //     desc: desc,
            // }
            // setHtml(template);
        } catch(error) {
            console.log(error);
        }    
    }

    //Get images from router
    const getImages = async() => {
        // console.log(html)
        // console.log(descArray)
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
            convertAll(data);
        } catch (error) {
            console.log(error)
        }
    }

    //get custom images
    const getCustomImages = async() => {
        //call all the waterfalls to get an image for each section
        const response = await Promise.all([
            calls.getCustomImageType(sensorCode, type),
            calls.getCustomImageMech(sensorCode, housing),
            calls.getCustomImageHousing(sensorCode, housing),
            calls.getCustomImageOption(sensorCode, option),
            calls.getCustomImageConnect(sensorCode, connect),
            calls.getCustomImageConnChart(sensorCode, connect, char),
            calls.getCustomImageSpec(sensorCode, char, option),
            calls.getCustomImagePicture(sensorCode, housing, char, type),
        ]);
        const data = response.map((response) => response.data);
        convertAll(data);
    }
    //convert images to the correct format
    const convertAll = (data) => {
        //console.log(data)
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
        setImages(template);
    }


    //DOM
    return (
        <div>
            <button onClick={() => generatePDF(sensorType, sensorCode, sensorData, customData, images, bullets)}>{sensorCode}</button>
            {!!images &&
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
                            <img className="type" src={images.type} alt='no image found'/>
                            <img className="mech" src={images.mech} alt='no image found'/>
                            <img className="housing" src={images.housing} alt='no image found'/>
                            <img className="option" src={images.option} alt='no image found'/>
                            <img className="connect" src={images.connect} alt='no image found'/>
                            <img className="conn_chart" src={images.conn_chart} alt='no image found'/>
                            <img className="date" src={date}></img>
                        </div>
                        
                        <div className="description" id="description" dangerouslySetInnerHTML={createMarkup(htmlRaw)}/>

                        <div className='footer'>
                            <span style={{fontSize:'10pt'}}><i>Sensor Solutions * V: (970) 879-9900  F: (970) 879-9700 * www.sensorso.com * {rev}</i></span>
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
                                <span style={{fontSize:'14pt'}}><b>{sensorCode}  -  </b></span> <span style={{fontSize:'12pt'}}><b>{type_description2}</b></span>
                                <br></br>
                                <span style={{fontSize:'12pt'}}><i>{description2}</i></span>
                            </div>
                        }
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
//https://stackoverflow.com/questions/48215965/how-to-display-an-array-of-strings-in-react-component

//https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml
