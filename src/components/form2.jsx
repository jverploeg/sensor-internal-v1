import React, { useState, useEffect, useCallback } from 'react';

export const Form2 = ({ data, onSubmit }) => {
    let fields = Object.keys(data);
    //remove id column
    fields.shift();

    const [inputs, setInputs] = useState(data); // inputs from submission fields

    const handleChange = (e) => {
        setInputs(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
    }    

  return (
    <form className="form" onSubmit={onSubmit}>
        {!!inputs && !!fields && fields.map((item, key) => (
          <div className="input-block">
            <label className="input-label">{item}</label>
            <textarea
                className="data-input"
                //id={key}
                //defaultValue={inputs[item]}
                //value={inputs[item]}
                name={item}
                placeholder={item}
                //placeholder={inputs.name}
                //value={inputs.name}
                onChange={handleChange}
            />
          </div>

        ))}
      <div className="form-group">
        <button className="form-control btn btn-primary" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};
export default Form2;