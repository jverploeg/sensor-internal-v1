import React, { useState, useEffect } from 'react';
import PDF from './pdf';



const Search = () => {
    //object destructure prop if necessary

    //declare state for keyboard input. initialize to empty string
    const [searchTerm, setSearchTerm] = useState('');
    const [inputs, setInputs] = useState({}); // inputs from submission fields


    const host = `http://192.168.1.118:3000`;

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
                </div>
                }
            </div>
        </div>

    )
}
export default Search;