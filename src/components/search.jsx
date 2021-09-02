// FUNCTIONAL DEPENDENCIES
import React, { useState, useEffect } from 'react';

// SUBCOMPONENTS
import PDF from './pdf';



const Search = () => {
    //object destructure prop if necessary

    //declare state for keyboard input. initialize to empty string
    const [searchTerm, setSearchTerm] = useState('');
    const [inputs, setInputs] = useState({}); // inputs from submission fields

    //EVENT HANDLERS
    const handleSubmit = (e) => {
        //console.log(e)
        e.preventDefault();
        //set search term
        let val = Object.values(inputs);
        //setState
        setSearchTerm(val[0]);
        //clear input fields
        document.getElementById("search-form").reset();
        setInputs({});
    }
    const handleKeyPress = (event) => {
        event.preventDefault();
        console.log(event)
        //triggered by pressing enter
        if(event.keyCode === 13){
            handleSubmit();
        }

    };
    //EVENT HANDLERS
    const handleChange = (e) => {
        setInputs(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
    }

    return(
        <div>
            <div className = "searchBox">
                <form id="search-form" onSubmit={handleSubmit}>
                        <input
                            className="sensor"
                            name="sensor"
                            placeholder="Sensor Code"
                            value={inputs.name}
                            onChange={handleChange}
                            //onKeyPress={handleKeyPress}//{(e) => e.key === 'Enter' && handleSubmit()}//andleEnter(e)}
                        />
                        <button
                            type="submit"
                            //onClick={handleSubmit}
                        >
                            Search
                        </button>
                </form>
                {/* <button type="submit" onClick={handleSubmit}>Search</button> */}
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