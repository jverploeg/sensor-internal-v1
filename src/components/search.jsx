import React, { useState, useEffect } from 'react';

const Search = () => {
    //object destructure prop if necessary

    //declare state for keyboard input. initialize to empty string
    const [sensor, setSensor] = useState('');
    const [inputs, setInputs] = useState({}); // inputs from submission fields

    //useEffect declarations

    //event handlers
    const handleChange = (e) => {
        setInputs(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
    }    


    return(
        <div className = "searchBox">
            <form id="search-form">
                    <input
                        className="housing"
                        name="housing"
                        placeholder='housing#'
                        maxLength='4'
                        value={inputs.name}
                        onChange={handleChange}
                    />
            </form>
        </div>
    )
}


export default Search;