// FUNCTIONAL DEPENDENCIES
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

// STYLING DEPENDENCIES
import { DataGrid, GridRowsProp, GridColDef, getInitialGridRowState } from '@material-ui/data-grid';
//import Grid from '@material-ui/core/Grid';
//import Button from '@material-ui/core/Button';

// SUBCOMPONENTS/HELPERS/CUSTOM HOOKS
import useToggle from './toggle';
import Search from './search';
// import usePageSwitch from './pageSwitch';
// import useReferredState from './ref';
//import ControlGrid from './dataGrid';


const App = () => {
    let viewports = ['Home', 'housing', 'char', 'option', 'char_op', 'connection', 'sensor']; //array of view options. tables with all have similar setup, home is different

    //DEFINE STATE//////////////////
    const [page, setPage] = useState({}); //initialize to homepage on initial render
    const [data, setData] = useState([]); //data from database
    const [inputs, setInputs] = useState({}); // inputs from submission fields
    const [columns, setColumns] = useState([]); // column name for tables
    const [rows, setRows] = useState([]); // formatted rows from data so dataGrid can be filled correctly
    const [inputCols, setInputCols] = useState([]); // need to make a deep copy of cols and then shift so we dont alter cols 
    // custom state/hooks
    const [isTextChanged, setIsTextChanged] = useToggle(); //Call the toggle hook which returns, current value and the toggler function
    const [currentPage, setCurrentPage] = useToggle();
    const [select, setButton] = useState(''); // sets the state for styling currentPage in navbar
    


    //USEEFFECT AND PAGE RERENDERING?////////////
    //TODO: fix useeffect logic below, get rid of repetitive calls
    //get data on initial page load? and if inputs change?
    //set pageView to Home on initial load
    //TODO: when multiple table tabs added, want to call getDATA (and modify how route is chosen) with useEffect[pageChange]...
    useEffect(() => {
        getData();
        setPage('Home');
        selected();
    },[]);

    useEffect(() => {
        getColumns();
        getRows();
        getData();
    },[page, isTextChanged])
    //get new row values whenever data is modified in database
    useEffect(() => {
        getColumns();
        getRows();
    },[data])
        // USEEFFECT TO CHECK IF STATE HAS CHANGED PROPERLY
    // useEffect(() => {
    //     console.log({data, rows, columns})
    // },[data, isTextChanged])




    //header for cors requests
    //const header = {'Content-Type', undefined}
    // set host to ip rather than localhost --> running into cors issues. come back and fix later
    const host = `http://192.168.1.118:3000`;

    //define Set Functions
    const getData = async() => {
        //determine route -> db table based on pageSelection
        let route = page;
        try {
            const response = await axios.get(`${host}/${route}`);
            setData(response.data);
        }
        catch (error) {
            console.log(error)
        }
    }
    const showData = () => {
        setIsTextChanged();
    }
    const getColumns = () => {
        let temp = [];
        let table = page;
        //iterate through any object and get the key names
        if(data[0]){
            let focus = data[0];
            let arrayKeys = Object.keys(focus);
            let format = {
                field: 'id',
                headerName: `${table}_id`,
                width: 150,
                editable: true,
            }
            temp.push(format);
            for(let i = 1; i < arrayKeys.length; i++) {
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
        let inputs = JSON.parse(JSON.stringify(temp));
        inputs.shift();
        setInputCols(inputs);
    }
    ////////////////////////////////////////
    /*
    TODO: figure out logic to map each database table row to the row format needed to use the Material DATAGRID.....
    */
    ///////////////////////////////////////
    const getRows = () => {
        let format = {};
        let rowsTemp = [];
        //now map the sample array to a rows state
        for(let i = 0; i < data.length; i++) {
            //need to get the first key from data object
            let temp = data[i];
            let keys = Object.keys(temp);
            let oldKey = keys[0];
            format.id = JSON.parse(JSON.stringify(temp[oldKey]));
            let partial = JSON.parse(JSON.stringify(data[i]));
            delete partial[oldKey];
            // spread operator to combine
            format = {...format, ...partial};
            rowsTemp.push(format);
            //clear the format object
            format = {};
        }
        //set state
        setRows(rowsTemp);
    }



    ////////EVENT HANDLERS////////////
    // Universal input bar handler
    // const onChangeHandler = useCallback(
    //     ({target:{name,value}}) => setInputs(state => ({ ...state, [name]:value }), [])
    // );
    const handleChange = (e) => {
        setInputs(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
    }    
    //edit table data handler
    const handleEditCellChangeCommitted = useCallback(
        ({ id, field, props }) => {
            // pass the col_name, row_id, and new_value to the router. will Update accordingly
            //determine route -> db table based on pageSelection
            let route = page;
            axios.put(`${host}/${route}`, {id, field, props})
            //axios.put(`${host}/sample`, {id, field, props})
            .then(response => {
              console.log('axios in app response',response);
            })
            .catch(error => {
              console.log(error);
            });
        });
    const handleSubmit = () => {
        //determine route -> db table based on pageSelection
        let route = page;
        axios.post(`${host}/${route}`, inputs)
        //axios.post(`${host}/sample`, temp)
          .then(response => {
            console.log(response);
          })
          .catch(error => {
            console.log(error);
          });

        //clear input fields
        document.getElementById("data-form").reset();
        setInputs({});
        //update data
        getData();
    }

    const handleRowClick = (e) => {
        let target = e.target;
        console.log(target)
    }

    const handlePageChange = (e) => {
        //get current page
        let current = page;
        //define the page we want to change to
        let newPage = e.target.attributes.value.value;
        //set the page
        setPage(newPage);
    }
    // const [select, setButton] = useState(''); // sets the state for styling currentStyle
    const selected = (e) => {
        // if nothing selected yet, focus on home page
        if (!select) {
          let target = document.getElementById('Home');
          setButton(target);
          target.classList.toggle('selected');
        } else {
            let target = e.currentTarget;
            if (select !== target) {
                // toggle off old
                select.classList.toggle('selected');
                // update state
                setButton(target);
                // toggle on new
                target.classList.toggle('selected');
            }
        } 
      };


    //DOM
    return(
        <div className = "page">
            <div className = "top">
                <h1>SENSOR SOLUTIONS</h1>
            </div>
            
            <div className="nav-bar">
                    {viewports && viewports.map((item, index) => (
                        <figure className="nav-container" onClick={(e) => selected(e)}>
                            <button
                                className="nav-button"
                                id={item}
                                value={item}
                                onClick={handlePageChange}
                            >{item}
                            </button>
                        </figure>
                    ))}
                    {/* <button onClick={handlePageChange} name='page1' value={viewports[0]} variant="contained">Home</button>
                    <button onClick={handlePageChange} name='page2' value={viewports[1]} variant="contained">Char</button>
                    <button onClick={handlePageChange} name='page3' value={viewports[2]} variant="contained">Housing</button> */}
            </div>

            <div className = "body">
                {(page === "Home") && 
                    <div>
                        <Search/>
                    </div>    
                }


                {(page !== "Home") && 
                    <div className="data">    
                        <div className = "table">
                            <button onClick={showData}>{isTextChanged ? 'Hide Data' : 'Show Data'}</button>
                            {!!isTextChanged &&
                                <div className = "foot" style={{ height: 400, width: '100%' }}>
                                    {!!rows &&
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
                            {/* <input name="field1" value={inputs.field1 || ''} onChange={handleChange} />
                            <input name="field2" value={inputs.field2 || ''} onChange={handleChange} /> */}

                            <form id="data-form">
                                {!!inputCols && inputCols.map((item, index) => (
                                    <input
                                        className="data-input"
                                        name={item.field}
                                        placeholder={item.field}
                                        value={inputs.name}
                                        onChange={handleChange}
                                    />
                                ))}
                            </form>
                            <button type="submit" onClick={handleSubmit}>ADD NEW DATA</button>
                        </div>
                    </div>
                }
                
            </div>
        </div>
    )
};

export default App;