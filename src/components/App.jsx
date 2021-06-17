import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import subcomponents below

const App = () => {
    //declare state
    const [sample, setSample] = useState([]);

    //define Set Functions
    const getData = async() => {
        try {
            const response = await axios.get(`http://localhost:3000/sample`);
            console.log({response})
            setSample(response.data);
        }
        catch (error) {
            console.log(error)
        }
    }

    //useEffect to render/rerender
    
    //sample axios call on initial render


    //event handlers
    const showData = (event) => {
        //when button is pressed, execute this function
        //e.preventDefault();
        console.log({event});
        getData();
    }

    //DOM
    return(
        <div className = "page">
            <div className = "top">
                <h1>SENSOR SOLUTIONS</h1>
            </div>
            <div className = "body">
                <button onClick = {(e) => showData(e)}>
                    Show Sample Data
                </button>
            </div>
            <div className = "table">
                <ul>
                    {!!sample && sample.map((item, index) => (
                        <li>
                            {item.count} --`{'>'}` {item.val}
                        </li>
                    ))}
                </ul>
                {/* <ul>
                    <li></li>
                </ul> */}
            </div>
            <div className = "foot">

            </div>
        </div>
    )
};

export default App;