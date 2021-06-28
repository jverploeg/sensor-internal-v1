// FUNCTIONAL DEPENDENCIES
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

// STYLING DEPENDENCIES
import { DataGrid, GridRowsProp, GridColDef, getInitialGridRowState } from '@material-ui/data-grid';
//import Grid from '@material-ui/core/Grid';
//import Button from '@material-ui/core/Button';

// SUBCOMPONENTS/HELPERS/CUSTOM HOOKS
import useToggle from './toggle';
// import usePageSwitch from './pageSwitch';
// import useReferredState from './ref';
//import ControlGrid from './dataGrid';


const App = () => {
    let viewports = ['Home', 'char', 'housing']; //array of view options. tables with all have similar setup, home is different

    //DEFINE STATE//////////////////
    const [page, setPage] = useState({}); //initialize to homepage on initial render
    const [data, setData] = useState([]); //data from database
    const [inputs, setInputs] = useState({}); // inputs from submission fields
    const [columns, setColumns] = useState([]); // column name for tables
    const [rows, setRows] = useState([]); // formatted rows from data so dataGrid can be filled correctly 
    // custom state/hooks
    const [isTextChanged, setIsTextChanged] = useToggle(); //Call the toggle hook which returns, current value and the toggler function
    


    //USEEFFECT AND PAGE RERENDERING?////////////
    //TODO: fix useeffect logic below, get rid of repetitive calls
    //get data on initial page load? and if inputs change?
    //set pageView to Home on initial load
    //TODO: when multiple table tabs added, want to call getDATA (and modify how route is chosen) with useEffect[pageChange]...
    useEffect(() => {
        getData();
        setPage('Home');
    },[]);

    //useEffect to get table columns on initial page load... change later to specific table_name
    // useEffect(() => {
    //     // getColumns();
    //     // getRows();
    //     getData();
    // },[isTextChanged])
    useEffect(() => {
        // getColumns();
        // getRows();
        getData();
    },[page])
    //get new row values whenever data is modified in database
    useEffect(() => {
        getColumns();
        getRows();
    },[data])
        // USEEFFECT TO CHECK IF STATE HAS CHANGED PROPERLY
    // useEffect(() => {
    //     console.log({rows, columns})
    // },[data])




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
            
            //old attempt at formatting for id
            // let keys = Object.keys(temp);
            // let oldKey = keys[0];
            // //format = sample[i]; NOOOOOOOO, this is a shallow copy!!!!!!!
            // format = JSON.parse(JSON.stringify(sample[i]));
            // //Replace oldKey with newKey so that the object follows formatting rules for dataGrid rows
            // let newKey = 'id';
            // delete Object.assign(format, {[newKey]: format[oldKey]  })[oldKey]
            // rowsTemp.push(format);
            //console.log({format})
        }
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
    //TODO: this is hard coded for now...Make dynamic for any table later on
    const handleSubmit = () => {
        let num = parseInt(inputs.field1);
        let temp = {
            count: num,
            val: inputs.field2
        };
        //determine route -> db table based on pageSelection
        let route = page;
        //axios.post(`${host}/${route}`, temp)
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
    }
    const handlePageChange = (e) => {
        //define the page we want to change to
        let focus = e.target.attributes.value.value;
        //set the page
        setPage(focus);
    }

    // USEEFFECT TO CHECK IF STATE HAS CHANGED PROPERLY
    // useEffect(() => {
    //     console.log({page})
    // },[page])




    //DOM
    return(
        <div className = "page">
            <div className = "top">
                <h1>SENSOR SOLUTIONS</h1>
            </div>
            
            <div className="navbar">
                <div>
                    <button onClick={(e) => handlePageChange(e)} name='page1' value={viewports[0]} variant="contained">Home</button>
                    <button onClick={handlePageChange} name='page2' value={viewports[1]} variant="contained">Char</button>
                    <button onClick={handlePageChange} name='page3' value={viewports[2]} variant="contained">Housing</button>
                </div>
            </div>

            <div className = "body">
                {(page === "Home") && 
                    <div>
                        <h1>HOME</h1>
                    </div>    
                }


                {(page !== "Home") && 
                    <div className="data">    
                        <div className = "table">
                            <button onClick={showData}>{isTextChanged ? 'Hide Data' : 'Show Data'}</button>
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
                }
                
            </div>
        </div>
    )
};

export default App;