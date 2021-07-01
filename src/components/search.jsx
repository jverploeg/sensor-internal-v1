import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import { PDFDownloadLink } from '@react-pdf/renderer';
import MyDocument from './pdf';


const Search = () => {
    //object destructure prop if necessary

    //variables
    let options = ['sensor', 'custom'];

    //declare state for keyboard input. initialize to empty string
    const [sensor, setSensor] = useState({});
    const [type, setType] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const [inputs, setInputs] = useState({}); // inputs from submission fields


    const host = `http://192.168.1.118:3000`;

    //useEffect declarations
    useEffect(() => {

    })

    //EVENT HANDLERS WITH AXIOS REQUESTS
    const getSensor = async(sensor) => {
        //determine route -> sensor type determined by leading search term chars
        let route = type;
        try {
            const response = await axios.get(`${host}/${type}`, sensor);
            setSensor(response.data);
        }
        catch (error) {
            console.log(error)
        }
    }
    const handleSubmit = () => {
        //set search term
        console.log({inputs})
        let val = Object.values(inputs);
        console.log({val})
        setSearchTerm(val[0]);
        //format inputs into an object here
        //cs or regular sensor

        //let sensorFormat = stringParser(inputs);
        console.log({inputs})
        //clear input fields
        document.getElementById("search-form").reset();
        setInputs({});
        //update data
        //getSensor(sensorFormat);
    }
    //EVENT HANDLERS
    const handleChange = (e) => {
        setInputs(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
    }


    //HELPER
    const stringParser = (string) => {
        //return a reformatted object
        //update type state
    }



    return(
        <div>
            <div className = "searchBox">
                <form id="search-form">
                        <input
                            className="housing"
                            name="housing"
                            placeholder="housing Code"
                            //maxLength='4' not relavent right now
                            value={inputs.name}
                            onChange={handleChange}
                        />
                </form>
                <button type="submit" onClick={handleSubmit}>Search</button>
            </div>

            <div className = "results">
                {!!searchTerm &&
                <div>
                <h1
                    value={searchTerm}
                />
                <button type="submit">{searchTerm}</button>
                </div>
                }
            </div>
        </div>

    )
}


export default Search;



{/* <input
className="housing"
name="housing"
placeholder='housing code'
//maxLength='4' not relavent right now
value={inputs.name}
onChange={handleChange}
/>
-
<input
className="char"
name="char"
placeholder='char code'
//maxLength='4' not relavent right now
value={inputs.name}
onChange={handleChange}
/>
-
<input
className="option"
name="option"
placeholder='electrical option'
//maxLength='4' not relavent right now
value={inputs.name}
onChange={handleChange}
/>
<input
className="connection"
name="connection"
placeholder='connection type'
//maxLength='4' not relavent right now
value={inputs.name}
onChange={handleChange}
/> */}