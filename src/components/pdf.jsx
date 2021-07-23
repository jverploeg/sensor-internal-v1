import React, { useState, useEffect } from 'react';
import axios from 'axios';

//helper functions
import generatePDF from './pdfGenerator';
import html2text from './html2text';
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
        console.log('hey')
        var sensor = 'MFM7-EHS1-F5P21';//fits
    } else if(temp === 'b') {
        var sensor = 'M1VE-MRS-E5CP2';//issues with 2nd page
    } else if(temp === 'c') {
        var sensor = 'CS1111';
    } else if(temp === 'd') {
        var sensor = 'CS1174';//fits
    } else if(temp === 'e') {
        var sensor = 'A63-37ADSD-51T21';//fits, but header description is close to spec_chart
    } else {
        var sensor = 'A47-18ADS-5KT21';
    }


    //define which category of sensor ['standard', 'custom', 'xproto']
    const [sensorType, setSensorType] = useState('');
    //define key data pieces
    const [sensorCode, setSensorCode] = useState('');
    const [customData, setCustomData] = useState({});
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
        //set state
        setSensorType(senstype);

        if (senstype === 'standard') {
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
            if(sensorType === 'standard') {
                getImages();
            }else if(sensorType === 'custom'){
                //need to get type for image selection first
                getType(char);
                //getCustomImages();
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
            // console.log(response.data);
            //let char = response.data[0].closest_char;
            //let temp = getType(char)

            // pattern of chaining promises, returning them to keep the promise chain alive.
            
            // axios
            //   .get('https://maps.googleapis.com/maps/api/geocode/json?&address=' + this.props.p1)
            //   .then(response => {
            //     this.setState({ p1Location: response.data });
            //     return axios.get('https://maps.googleapis.com/maps/api/geocode/json?&address=' + this.props.p2);
            //   })
            //   .then(response => {
            //     this.setState({ p2Location: response.data });
            //     return axios.get('https://maps.googleapis.com/maps/api/geocode/json?&address=' + this.props.p3);
            //   })

            //cascading call
            // try {
            //     const response2 = await axios.get(`${host}/custom/type/${char}`);
            //     console.log(response2.data)
            // }
            // catch (error) {
            //     console.log(error);
            // }
        }
        catch (error) {
            console.log(error)
        }
    }
    const getType = async(input) => {
        try {
            const response = await axios.get(`${host}/ctype/${input}`);//, {params: {input}});
            let tempType = response.data[0].type;
            setType(tempType);
        }
        catch (error) {
            console.log(error)
        }
    }




        //TODO: either here or in parser, logic to differentiate between 3 sensor types...
        // -> NO custom sensors arent consistent if they use part code or csxxx code for images/data
    const breakdown = (data, sensor) => {
        console.log('breakdown')
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

        let bullets = html2text(1, char);
        let desc = html2text(2, char);
        let template = {
            bullets: bullets, 
            desc: desc,
        }
        console.log(template)
        setHtml(template);
    }
    const customBreakdown = (sensor) => {
        //destructure redefine data/props
        let specs = sensor[0];
        setTypeD('');//dont need type description, its part of the title for custom sensors...
        let char = specs.closest_char;
        setChar(char);
        let housing = specs.closest_housing;
        setHousing(housing);
        //get type from <char -->axios on char table... FIXED!
        // setType(specs.type); --> called elsewhere now
        let conn = specs.closest_connection;
        setConnect(conn);
        let opt = specs.closeest_option;
        setOption(opt);
        setRev(specs.rev);
        setDescription(specs.title);

        //CHECK AFTER WE CAN GET IMAGES
        // let bullets = html2text(1, char, sensor);
        // let desc = html2text(2, char, char, sensor);
        // let template = {
        //     bullets: bullets, 
        //     desc: desc,
        // }
        // console.log(template)
        // setHtml(template);

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

    //get custom images
    const getCustomImages = () => {
        //use states for paths. need to try and get csxxxx image first, if not -> then try alternates.
        // axios.all([
        //     axios.get(`${host}/images/type/Type-${sensorCode}-Model`, { responseType: 'arraybuffer' }),
        //     axios.get(`${host}/images/type/Type-${type}-Model`, { responseType: 'arraybuffer' }),
        // ])
        // .then(axios.spread((img1, img2) => {
        //     console.log(img1.data)
        //     console.log('----')
        //     console.log(img2.data)
        // }))
        // try {
        //     const response = await axios.get(`${host}/images/type/Type-${sensorCode}-Model`, { responseType: 'arraybuffer' });
        //     console.log(response.data);
        // }
        // catch (error) {
        //     try {
        //         const response = await axios.get(`${host}/images/type/Type-${type}-Model`, { responseType: 'arraybuffer' });
        //         console.log(response.data);
        //     }
        //     catch (error) {
        //         console.log(error);
        //     }
        // }
        let typeImage = calls.getCustomImageType(sensorCode, type);
        console.log('type', typeImage);
        let mechImage = calls.getCustomImageMech(sensorCode, housing);
        console.log('mech', mechImage);



        // const data = response.map((response) => response.data);
        // let output = data.flat(); 
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
                            <span style={{fontSize:'14pt'}}><b>{sensorCode}  -  </b></span> <span style={{fontSize:'12pt'}}><b>{type_description}</b></span>
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