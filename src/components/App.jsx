// FUNCTIONAL DEPENDENCIES
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';


// STYLING DEPENDENCIES
// import { DataGrid } from '@material-ui/data-grid';
import { DataGrid, GridRowsProp, GridColDef, getInitialGridRowState } from '@material-ui/data-grid';

// SUBCOMPONENTS
import Search from './search';

// CUSTOM HOOKS
import useToggle from './toggle';
import { ControlCameraOutlined } from '@material-ui/icons';

// HELPERS
//import callDB from '../helpers/appRequests';
import Tables from './tables';

const App = () => {
    let viewports = ['Home', 'housing', 'char', 'option', 'char_op', 'connection', 'sensor', 'custom', 'xproto']; //array of view options. tables with all have similar setup, home is different

    //////////////STATE DECLARATION////////////////////////////////////////////////////
    const [page, setPage] = useState({}); //initialize to homepage on initial render
    const [data, setData] = useState([]); //data fetched from database
    const [inputs, setInputs] = useState({}); // inputs from submission fields
    const [columns, setColumns] = useState([]); // column name for tables
    const [rows, setRows] = useState([]); // formatted rows from data so dataGrid can be filled correctly
    const [inputCols, setInputCols] = useState([]); // need to make a deep copy of cols and then shift so we dont alter cols 
    // custom state/hooks
    const [isTextChanged, setIsTextChanged] = useToggle(); //Call the toggle hook which returns, current value and the toggler function
    const [select, setButton] = useState(''); // sets the state for styling currentPage in navbar
    const [deleteShow, setShow] = useState(false);//useToggle();
    const [deleteRow, setDelete] = useState([]);
    /////////////////////////////////////////////////////////////////////////////////////


    /////////////////////RERENDER PAGE ON TRIGGERS////////////////////////////////////////////
    useEffect(() => {
        //getData();
        setPage('Home');//initialize page to start on home
        selected();//highlight home tab
    },[]);
    //TODO: do we we need both these useEffects below????
    useEffect(() => {
        console.log(deleteShow,deleteRow)
        setShow(false);
        setDelete([]);
        if(page !== 'Home'){
            getData();
        }
    },[page])//, isTextChanged])
    //get new row values whenever data is modified in database
    useEffect(() => {
        console.log(deleteShow,deleteRow)
        setShow(false);
        setDelete([]);
        if(data.length > 1) {
            getColumns();
            getRows();
        }
    },[data])
    //on deletion, make sure delete button is hidden
    useEffect(() => {
        setShow(false);
        setDelete([]);
    },[rows])
    /////////////////////////////////////////////////////////////////////////////////////////////



    const host = `http://192.168.1.118:3000`;
    //////////REQUESTS/////////////////////
    const getData = async() => {
        //determine route -> db table based on pageSelection
        let route = page;
        try {
            const { data } = await axios.get(`${host}/${route}`);
            setData(data);
        }
        catch (error) {
            console.log(error)
        }

        /////////////////////////////////////////////////
        //TODO: implement helpers later. these are causing errors right now...
        //let temp = callDB.getData(page);//await callDB.getData(page);
        //console.log('appdata', temp)
        ///////////////////////////////////////////////////////////////////
    }

    const getColumns = () => {
        var cols = [];
        if(page === 'housing'){
            cols = Tables.housing();
        } else if(page === 'char'){
            cols = Tables.char();
        } else if(page === 'option'){
            cols = Tables.option();
        } else if(page === 'char_op'){
            cols = Tables.char_op();
        } else if(page === 'connection'){
            cols = Tables.connection();
        } else if(page === 'sensor'){
            cols = Tables.sensor();
        } else if(page === 'custom'){
            cols = Tables.custom();
        } else if(page === 'xproto'){
            cols = Tables.xproto();
        }
        //set the column state now
        setColumns(cols);
        let inputs = JSON.parse(JSON.stringify(cols));
        inputs.shift();
        setInputCols(inputs);
    }
    
    //https://material-ui.com/components/data-grid/columns/
    const getRows = () => {
        let format = {};
        let rowsTemp = [];
        //now map the sample array to a rows state
        //console.time('rows')
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
        //console.timeEnd('rows')
        //set state
        setRows(rowsTemp);
    }
    ////////////////////////////////////////
    /*
    TODO: may need to come back and actually customize each page individually to better display more relevant information in diff col widths
    */
    ///////////////////////////////////////
    



    ////////EVENT HANDLERS////////////
    // Universal input bar handler
    const handleChange = (e) => {
        setInputs(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
    }    
    //edit table data handler
    const handleCellEditCommit = React.useCallback(
        ({ id, field, value }) => {
            //update database
            axios.put(`${host}/${page}`, {id, field, value})
            .then(response => {
              console.log(response);
            })
            .catch(error => {
              console.log(error);
            });
        },
        [rows],
      );

    const handleSubmit = () => {
        //run change submission
        let route = page;
        console.log(inputs)
        axios.post(`${host}/${route}`, inputs)
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
        //TODO: better way to update rather than calling entire database again?????
    }
    const handlePageChange = (e) => {
        //define the page we want to change to
        let newPage = e.target.attributes.value.value;
        //set the page
        setPage(newPage);
    }
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
    //////////////////////////////////////////////////////
    
    //ROW DELETION
    const handleSelect = React.useCallback(
        (id) => {
            if(id.length === 0){
                setShow(false);
                setDelete([]);
            }else {
                setShow(true);
                let row = id[0];
                setDelete(row);
            }
        },
        [rows],
    ); 

    const handleDelete = () => {
        let id = deleteRow;
        //delete entry from database;
        axios.delete(`${host}/${page}/${id}`)//, id)
        .then(response => {
            console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
        //get modified data
        //update rows state to uncheck selection immediately, reove row immediately, and on page switch
        let temp = JSON.parse(JSON.stringify(rows));//deep copy allows deletion
        //find id in temp;
        for(let i = 0; i < temp.length; i++){
            if(temp[i].id === id){
                temp.splice(i,1);
            }
        }
        //update state
        setRows(temp);
    }



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
                            {/* <button onClick={showData}>{isTextChanged ? 'Hide Data' : 'Show Data'}</button> */}
                            {!!data &&
                                <div className = "foot" style={{ height: 600, width: '100%' }}>
                                    {!!rows &&
                                        <DataGrid
                                            //rowHeight={75}//{52}pixels is default
                                            columns={columns}
                                            rows={rows}
                                            //onEditCellChangeCommitted={handleEditCellChangeCommitted}
                                            onCellEditCommit={handleCellEditCommit}
                                            checkboxSelection//={handleSelect}
                                            onSelectionModelChange={handleSelect}
                                        />
                                    }
                                </div>
                            }
    
                        </div>
                        <div className="delete">
                                {!!deleteShow && 
                                    <div>
                                        <button onClick={handleDelete}>DELETE</button>
                                    </div>    
                                }
                        </div>
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
                    </div>
                }
            </div>
        </div>
    )
};

export default App;