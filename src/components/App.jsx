// FUNCTIONAL DEPENDENCIES
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

// STYLING DEPENDENCIES


// SUBCOMPONENTS/HELPERS/CUSTOM HOOKS
import useToggle from './toggle';
import RowModelControlGrid from './dataGrid';


const App = () => {
    //declare state
    const [sample, setSample] = useState([]);
    const [inputs, setInputs] = useState({});
    const [options, setOptions] = useState(false);

    // Call the toggle hook which returns, current value and the toggler function
    const [isTextChanged, setIsTextChanged] = useToggle();

    // Universal input bar handler
    const onChangeHandler = useCallback(
        ({target:{name,value}}) => setInputs(state => ({ ...state, [name]:value }), [])
    );

    //header for cors requests
    //const header = {'Content-Type', undefined}
    // set host to ip rather than localhost --> running into cors issues. come back and fix later
    const host = `http://192.168.1.118:3000`;

    //define Set Functions
    const getData = async() => {
        try {
            const response = await axios.get(`${host}/sample`);
            console.log({response})
            setSample(response.data);
        }
        catch (error) {
            console.log(error)
        }
    }

    //useEffect to render/rerender
    // useEffect(() => {
    //     getData();
    // },[inputs, options])
    
    //sample axios call on initial render


    //event handlers
    const showData = () => {
        setIsTextChanged();
        getData();
    }
    const handleSubmit = () => {
        console.log({inputs});
        let temp = {
            count: inputs.field1,
            val: inputs.field2
        };
        axios.post(`${host}/sample`, temp)
          .then(response => {
            console.log(response);
          })
          .catch(error => {
            console.log(error);
          });

        //clear input fields
        setInputs({})  
    }
    const changeData = (event) => {
        console.log({event});
        // let target = getElementById(event);
        // console.log({target})
    }

    //DOM
    return(
        <div className = "page">
            <div className = "top">
                <h1>SENSOR SOLUTIONS</h1>
            </div>
            <div className = "body">
                <button onClick={showData}>{isTextChanged ? 'Hide Data' : 'Show Data'}</button>
            </div>
            <div className = "table">
                <ul>
                    {!!isTextChanged && sample.map((item, index) => (
                        <li id="index">
                            {item.count}  {item.val}
                            {/* <button onClick={(id) => changeData(id)}>
                                Change entry
                            </button> */}
                            {/* {!!options &&
                            <input key="field1" name="field1" onChange={onChangeHandler} value={inputs.field1}/>
                            <input key="field2" name="field2" onChange={onChangeHandler} value={inputs.field2}/>
                            <button type="submit" onClick={handleSubmit}>ADD DATA</button>
                            } */}
                        </li>
                    ))}
                </ul>
            </div>
            <div className = "addData">
                {/* <form onSubmit={handleSubmit}>
                    <input key="field1" name="field1" onChange={({target}) => setInputs(state => ({...state,field1:target.value}))} value={inputs.field1}/>
                    <input key="field2" name="field2" onChange={({target}) => setInputs(state => ({...state,field2:target.value}))} value={inputs.field2}/>
                    <button type="submit">Submit</button>
                </form> */}
                <input key="field1" name="field1" onChange={onChangeHandler} value={inputs.field1}/>
                <input key="field2" name="field2" onChange={onChangeHandler} value={inputs.field2}/>
                <button key="text1" type="submit" onClick={handleSubmit}>ADD DATA</button>
            </div>

            <div className = "foot">

            </div>
        </div>
    )
};

export default App;