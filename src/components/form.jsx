import React, { useState, useEffect, useCallback } from 'react';

export const Form = ({ data, onSubmit }) => {
    console.log({data})
    //need to destructure data into form fields and prefilled strings... 
    let fields = Object.keys(data); //Array(8) [ "id", "housing_code", "part_number", "rev", "title", "web_valid", "png_file", "mech_file" ]
    //remove id column
    fields.shift();

    const [inputs, setInputs] = useState(data); // inputs from submission fields
    console.log(inputs)

    const handleChange = (e) => {
        setInputs(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
    }    

  return (
    <form onSubmit={onSubmit}>
        {!!fields && fields.map((item, index) => (
            <input
                //className="data-input"
                //id={key}
                name={item}
                placeholder={item}
                value={inputs.name}
                onChange={handleChange}
            />
        ))}
      {/* <div className="form-group">
        <label htmlFor="name">Name</label>
        <input className="form-control" id="name" />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email address</label>
        <input
          type="email"
          className="form-control"
          id="email"
          placeholder="name@example.com"
        />
      </div> */}
      <div className="form-group">
        <button className="form-control btn btn-primary" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};
export default Form;
//https://dev.to/sankhadeeproy007/using-react-hook-form-with-react-native-part-ii-pre-filled-values-conditional-fields-ik1
//https://github.com/react-hook-form/react-hook-form/discussions/4144
//https://goshakkk.name/react-forms-for-editing/
/*
                        <div className = "addData">
                            <form id="data-form">
                                {!!inputCols && inputCols.map((item, index) => (
                                    <input
                                        className="data-input"
                                        //id={key}
                                        name={item.field}
                                        placeholder={item.field}
                                        value={inputs.name}
                                        onChange={handleChange}
                                    />
                                ))}
                            </form>
                            <button type="submit" onClick={handleSubmit}>ADD NEW DATA</button>
                        </div>
*/

/*

Warning: State updates from the useState() and useReducer() Hooks don't support the second callback argument.
 To execute a side effect after rendering, declare it in the component body with useEffect().

*/
