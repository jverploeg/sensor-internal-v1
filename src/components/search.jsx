import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Parser from './parse';
import PDF from './pdf';
// import {Buffer} from 'buffer';
//Buffer.from('anything','base64');


const Search = () => {
    //object destructure prop if necessary

    //variables
    let options = ['sensor', 'custom'];

    //declare state for keyboard input. initialize to empty string
    const [sensor, setSensor] = useState({});
    const [type, setType] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const [inputs, setInputs] = useState({}); // inputs from submission fields
    const [images, setimages] = useState({});


    const host = `http://192.168.1.118:3000`;
    let testString = 'A47-18ADS-5KT21';


    //get images from router
    const getImages = async(input) => {
        let tempInput = 'typeAH';
        try {
            const response = await axios.get(`${host}/images/${tempInput}`, { responseType: 'arraybuffer' });
            //test url
            // const response = await axios.get(
            //     "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350",
            //     { responseType: 'arraybuffer' },
            // );
            //console.log({response})
            const buffer = Buffer.from(response.data, 'base64');
            const buffer2 = Buffer.from(response.data, 'binary');
            const basedBuffer = buffer.toString('base64');
            const binary = buffer2.toString('base64');

            // convert the image data to correct base64format.
            const base64 = btoa(
                new Uint8Array(response.data).reduce(
                  (data, byte) => data + String.fromCharCode(byte),
                  '',
                ),
            );
            console.log(base64)


            // console.log({buffer, basedBuffer}, basedBuffer.length)
            // console.log({buffer2, binary}, binary.length)
            setimages( "data:;base64," + base64 );
        }
        catch (error) {
            console.log(error)
        }
    }
    const test = (search) => {
        console.log({search});
        //call data request
        //some middle function to parse request?
        //need to send objects --> {type: 'AH'} or somethig similar...
        getImages(search);
    }
            //determine route -> db table based on pageSelection
            // let route = page;
            // try {
            //     const response = await axios.get(`${host}/${route}`);
            //     setData(response.data);
            // }
            // catch (error) {
            //     console.log(error)
            // }
    // const getSensor = async(sensor, type) => {
    //     try {
    //         const response = await Promise.all([
    //             axios.get(`http://192.168.1.118:3000/sensorValid`, {params: {sensor}}),
    //             axios.get(`http://192.168.1.118:3000/type`, {params: {type}}),
    //         ]);
    //         const data = response.map((response) => response.data);
    //         let output = data.flat();
    //         //generatePDF(sensor, output);
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
    //useEffect declarations
    // useEffect(() => {

    // })

    //EVENT HANDLERS WITH AXIOS REQUESTS
    const handleSubmit = () => {
        //set search term
        let val = Object.values(inputs);
        //setState
        setSearchTerm(val[0]);
        //clear input fields
        document.getElementById("search-form").reset();
        setInputs({});
    }
    //EVENT HANDLERS
    const handleChange = (e) => {
        setInputs(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
    }

    return(
        <div>
            <div className = "searchBox">
                <form id="search-form">
                        <input
                            className="sensor"
                            name="sensor"
                            placeholder="Sensor Code"
                            value={inputs.name}
                            onChange={handleChange}
                        />
                </form>
                <button type="submit" onClick={handleSubmit}>Search</button>
            </div>

            <div className = "results">
                {!!searchTerm &&
                <div>
                    <PDF input={searchTerm} />
                    {/* <button onClick={() => Parser(searchTerm)}>{searchTerm}</button> */}
                    {/* <button onClick={() => test(searchTerm)}>{searchTerm}</button> */}
                    {/* <img src={images} alt='not found'/>
                    <img src={require(`D:/DATA/Sensor/webApp/images/type/Type-AH-Model.png`).default}></img> */}
                    {/* <img src={`https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350`} alt='not found'/> */}
                </div>
                }
            </div>
        </div>

    )
}
export default Search;