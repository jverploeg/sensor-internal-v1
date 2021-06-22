// FUNCTIONAL DEPENDENCIES
import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';

// STYLING DEPENDENCIES
import { DataGrid, GridRowsProp, GridColDef, getInitialGridRowState } from '@material-ui/data-grid';
//import Grid from '@material-ui/core/Grid';
//import Button from '@material-ui/core/Button';

// SUBCOMPONENTS/HELPERS/CUSTOM HOOKS
import useToggle from './toggle';
import usePageSwitch from './pageSwitch';
import useReferredState from './ref';
//import ControlGrid from './dataGrid';

//useref
// export default function useReferredState(initialValue) {
//     const [state, setState] = useState(initialValue);
//     const reference = useRef(state);

//     const setReferredState = value => {
//         reference.current = value;
//         setState(value);
//     };

//     return [reference, setReferredState];
// }


const App = () => {
    let viewports = ['Home', 'sample']; //array of view options. tables with all have similar setup, home is different
    var currentPage = viewports[0];
    //DEFINE STATE//////////////////
    const [page, setPage] = useReferredState(); //initialize to homepage
    const [sample, setSample] = useState([]); //data from database
    const [inputs, setInputs] = useState({}); // inputs from submission fields
    const [columns, setColumns] = useState([]); // column name for tables
    const [rows, setRows] = useState([]); // formatted rows from data so dataGrid can be filled correctly 
    // custom state/hooks
    const [isTextChanged, setIsTextChanged] = useToggle(); //Call the toggle hook which returns, current value and the toggler function
    // const [page, setPage] = usePageSwitch(); //initialize to homepage


    //USEEFFECT AND PAGE RERENDERING?////////////
    //TODO: fix useeffect logic below, get rid of repetitive calls
    //get data on initial page load? and if inputs change?
    useEffect(() => {
        getData();
        //setPage('Home');
    },[]);

    //useEffect to get table columns on initial page load... change later to specific table_name
    useEffect(() => {
        // getColumns();
        // getRows();
        getData();
    },[isTextChanged])
    useEffect(() => {
        getColumns();
        getRows();
    },[sample])
    // useEffect(() => {
    //     setPage(currentPage);
    //     console.log({page, currentPage})
    // },[currentPage])




    //header for cors requests
    //const header = {'Content-Type', undefined}
    // set host to ip rather than localhost --> running into cors issues. come back and fix later
    const host = `http://192.168.1.118:3000`;

    //define Set Functions
    const getData = async() => {
        try {
            const response = await axios.get(`${host}/sample`);
            //console.log({response})
            setSample(response.data);
        }
        catch (error) {
            console.log(error)
        }
    }



    const handleEditCellChangeCommitted = useCallback(
        ({ id, field, props }) => {
            // pass the col_name, row_id, and new_value to the router. will Update accordingly
            axios.put(`${host}/sample`, {id, field, props})
            .then(response => {
              console.log('axios in app response',response);
            })
            .catch(error => {
              console.log(error);
            });

            //now call get to update or state here...
            //OR JUST SET THE ROW CHANGED HERE?????
            //getData();
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
                temp.push(format);
            }
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
        // need to get size of columns...
        let length = columns.length;
        let format = {};
        let rowsTemp = [];
        //now map the sample array to a rows state
        for(let i = 0; i < sample.length; i++) {
            //format = sample[i]; NOOOOOOOO, this is a shallow copy!!!!!!!
            format = JSON.parse(JSON.stringify(sample[i]));
            rowsTemp.push(format);
        }
        setRows(rowsTemp);
    }


    // Universal input bar handler
    // const onChangeHandler = useCallback(
    //     ({target:{name,value}}) => setInputs(state => ({ ...state, [name]:value }), [])
    // );
    const handleChange = e => {
        setInputs(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
    }    






    //event handlers
    const showData = () => {
        setIsTextChanged();
    }

    //TODO: this is hard coded for now...Make dynamic for any table later on
    const handleSubmit = () => {
        let num = parseInt(inputs.field1);
        let temp = {
            count: num,
            val: inputs.field2
        };
        axios.post(`${host}/sample`, temp)
          .then(response => {
            console.log(response);
            //setInputs({})
          })
          .catch(error => {
            console.log(error);
          });

        //clear input fields
        setInputs({});
        //getData({});  
    }

    // const usePageSwitch = (old, input) => {
    //     // Initialize the state
    //     const [state, setState] = useState(old);
        
    //     // This function change the boolean value to it's opposite value
    //     const toggle = useCallback(() => setState(input), []);
        
    //     return [state, toggle]
    // }

    const handlePageChange = (e) => {
        console.log(e.target.attributes.value.value)
        let focus = e.target.attributes.value.value;
        console.log({focus})
        // currentPage = focus;
        //set the page
        console.log({page, currentPage})
        // setPage(focus => {
        //     console.log({focus});
        //     return focus;
        // }) nooooooooooooooooooooooooo


        // usePageSwitch(page, focus)
        setPage(focus);
        //setPage(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
        console.log({page, currentPage})
    }
    // useEffect(() => {
    //     function handlePageChange(event) {
    //         console.log(e.target.attributes.value.value)
    //         let focus = e.target.attributes.value.value;
    //         console.log({focus})
    //         // currentPage = focus;
    //         //set the page
    //         console.log({page, currentPage})
    //         // usePageSwitch(page, focus)
    //         //setPage(focus);
    //         //setPage(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
    //         console.log({page, currentPage})
    //     }
    // })

    //DOM
    return(
        <div className = "page">
            <div className = "top">
                <h1>SENSOR SOLUTIONS</h1>
            </div>
            
            <div className="navbar">
                <div>
                    <button onClick={(e) => handlePageChange(e)} name='page1' value={viewports[0]} variant="contained">Home</button>
                    <button onClick={handlePageChange} name='page2' value={viewports[1]} variant="contained">Sample</button>
                </div>
            </div>

            <div className = "body">
                <button onClick={showData}>{isTextChanged ? 'Hide Data' : 'Show Data'}</button>
            </div>
            <div className = "table">
                {!!isTextChanged &&
                    <div className = "foot" style={{ height: 400, width: '100%' }}>
                        {!!rows &&
                            // <ControlGrid
                            //     columns={columns}
                            //     rows={rows}
                            //     //onEditCellChangeCommitted={handleEditCellChangeCommitted}
                            // />
                            <DataGrid
                                columns={columns}
                                rows={rows}
                                onEditCellChangeCommitted={handleEditCellChangeCommitted}
                            />
                        }
                    </div>
                }
            </div>
            <div className = "addData">
                {/* <input key="field1" name="field1" onChange={onChangeHandler} value={inputs.field1 || ''}/>
                <input key="field2" name="field2" onChange={onChangeHandler} value={inputs.field2 || ''}/> */}
                <input name="field1" value={inputs.field1 || ''} onChange={handleChange} />
                <input name="field2" value={inputs.field2 || ''} onChange={handleChange} />
                <button key="text1" type="submit" onClick={handleSubmit}>ADD DATA</button>
            </div>


        </div>
    )
};

export default App;