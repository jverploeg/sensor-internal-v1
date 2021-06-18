// FUNCTIONAL DEPENDENCIES
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

// STYLING DEPENDENCIES
import { DataGrid, GridRowsProp, GridColDef, getInitialGridRowState } from '@material-ui/data-grid';

// SUBCOMPONENTS/HELPERS/CUSTOM HOOKS
import useToggle from './toggle';
import RowModelControlGrid from './dataGrid';


const App = () => {
    //declare state
    const [sample, setSample] = useState([]);
    const [inputs, setInputs] = useState({});
    const [columns, setColumns] = useState([]);
    const [rows, setRows] = useState([]);
    const [options, setOptions] = useState(false);
    // Call the toggle hook which returns, current value and the toggler function
    const [isTextChanged, setIsTextChanged] = useToggle();

    const [editRowsModel, setEditRowsModel] = useState({});

    const handleEditRowModelChange = useCallback((params) => {
        console.log({params})
      setEditRowsModel(params.model);
      //setRows(params.model);
      //console.log({editRowsModel})
      console.log({params})
      console.log({rows})
    }, []);
    const handleEditCellChangeCommitted = useCallback(
        ({ id, field, props }) => {
            console.log({id, field, props})
            console.log({rows})
            // let old = [rows[id - 1]];
            // //old = old.value;
            // let col = old[0];//[field];
            // let key = col[field];
            //console.log({old, col, field, key}, col[field])
            axios.put(`${host}/sample`, {id, field, props})
            .then(response => {
              console.log(response);
            })
            .catch(error => {
              console.log(error);
            });
        //   if (field === 'fullName') {
        //     const data = props; // Fix eslint value is missing in prop-types for JS files
        //     const [firstName, lastName] = data.value.toString().split(' ');
        //     const updatedRows = rows.map((row) => {
        //       if (row.id === id) {
        //         return { ...row, firstName, lastName };
        //       }
        //       return row;
        //     });
        //     setRows(updatedRows);
        //   }
        // },
        //[rows],
        });

    //get data on initial page load? and if inputs change?
    useEffect(() => {
        getData()
    },[]);

    //useEffect to get table columns on initial page load... change later to specific table_name
    useEffect(() => {
        getColumns();
        getRows();
        console.log({columns, rows})
    },[isTextChanged])
    const getColumns = () => {
        let temp = [];
        //iterate through any object and get the key names
        if(sample[0]){
            let focus = sample[0];
            let arrayKeys = Object.keys(focus);
            for(let i = 0; i < arrayKeys.length; i++) {
                let item = arrayKeys[i];
                let format = {
                    field: '',
                    headerName: '',
                    width: 150,
                    editable: true,
                }
                format.field = item; 
                format.headerName = item;
                // format.field = JSON.parse(JSON.stringify(arrayKeys[i]));
                // format.headerName = JSON.parse(JSON.stringify(arrayKeys[i]));
                temp.push(format);
            }
            // arrayKeys.forEach(item => {
            //     //console.log()
            //     format.field = item; 
            //     format.headerName = item;
            //     temp.push(format);
            // })
        }
        
        //set the column state now
        setColumns(temp);
    }

    ////////////////////////////////////////
    /*
    TODO: figure out logic to map each database table row to the row format needed to use the Material DATAGRID.....
    */
    ///////////////////////////////////////
    const getRows = () => {
        //set up template
        // need to get size of columns...
        let length = columns.length;
        //console.log('size', {length})
        // iterate 0-length and set up col key definitions....
        let format = {};
        let rowsTemp = [];
        // for(let i = 0; i < length; i++){
        //     let numToString = (i+1).toString();
        //     let temp = 'col' + numToString;
        //     format[temp] = '';
        // }
        //console.log({format});
        //now map the sample array to a rows state
        //console.log(sample.length)
        for(let i = 0; i < sample.length; i++) {
            //format = sample[i]; NOOOOOOOO, this is a shallow copy!!!!!!!
            format = JSON.parse(JSON.stringify(sample[i]));
            //format.id = (i+1);
            //console.log(sample[i], format)
            rowsTemp.push(format);
        }
        setRows(rowsTemp);
        //console.log({rows})

        // const rows1 = [
        //     { id: 1, count: 1, val: 'World' },
        //     { id: 2, count: 2, val: 'is Awesome' },
        //     { id: 3, count: 3, val: 'is Amazing' },
        // ];
        // setRows(rows1);
    }
    const rowEdit = (event) => {
        console.log(event)
    }



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
        //getData();
    }
    const handleSubmit = () => {
        console.log({inputs});
        let num = parseInt(inputs.field1);
        console.log({num})
        let temp = {
            count: num,
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
            {/* <code>editRowsModel: {JSON.stringify(editRowsModel)}</code> */}
            <div className = "table">
                {!!isTextChanged &&
                    <div className = "foot" style={{ height: 400, width: '100%' }}>
                        {!!rows &&
                            <DataGrid
                                columns={columns}
                                rows={rows}
                                onEditCellChangeCommitted={handleEditCellChangeCommitted}
                                //onChange={(e) => rowEdit(e)}
                                // editRowsModel={editRowsModel}
                                // onEditRowModelChange={handleEditRowModelChange}
                            />
                        }
                    </div>
                }
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


        </div>
    )
};

export default App;