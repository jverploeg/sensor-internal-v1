// FUNCTIONAL DEPENDENCIES
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';


// STYLING DEPENDENCIES
// import { DataGrid } from '@material-ui/data-grid';
import { DataGrid, GridRowsProp, GridColDef, getInitialGridRowState } from '@material-ui/data-grid';
// import Modal from '@material-ui/core/Modal';
// import { makeStyles } from '@material-ui/core/styles';


// SUBCOMPONENTS
import Search from './search';
import NewSensor from './newSensor';
import FreshSensor from './freshSensor';

// CUSTOM HOOKS
import useToggle from './toggle';
//import { ControlCameraOutlined } from '@material-ui/icons';


// HELPERS
//import callDB from '../helpers/appRequests';
import Tables from './tables';

const App = () => {
    let viewports = ['Home', 'Housing', 'Char', 'Option', 'Char_Op', 'Connection', 'Sensor', 'Custom'];//, 'Xproto'];//, 'Settings']; //array of view options. tables with all have similar setup, home is different

    //////////////STATE DECLARATION////////////////////////////////////////////////////
    const [page, setPage] = useState({}); //initialize to homepage on initial render
    const [data, setData] = useState([]); //data fetched from database
    const [inputs, setInputs] = useState({}); // inputs from submission fields
    const [columns, setColumns] = useState([]); // column name for tables
    const [rows, setRows] = useState([]); // formatted rows from data so dataGrid can be filled correctly
    const [inputCols, setInputCols] = useState([]); // need to make a deep copy of cols and then shift so we dont alter cols 
    // custom state/hooks
    //const [isTextChanged, setIsTextChanged] = useToggle(); //Call the toggle hook which returns, current value and the toggler function
    const [select, setButton] = useState(''); // sets the state for styling currentPage in navbar
    const [deleteShow, setShow] = useState(false);//useToggle();
    const [chosenRow, setChosen] = useState([]);

    const [open, setOpen] = useState(false);

    /////////////////////////////////////////////////////////////////////////////////////


    /////////////////////RERENDER PAGE ON TRIGGERS////////////////////////////////////////////
    useEffect(() => {
        //getData();
        setPage('Home');//initialize page to start on home
        selected();//highlight home tab
    },[]);
    //TODO: do we we need both these useEffects below????
    useEffect(() => {
        setShow(false);
        setChosen([]);
        if(page !== 'Home'){
            getData();
        }
    },[page])//, isTextChanged])
    //get new row values whenever data is modified in database
    useEffect(() => {
        setShow(false);
        setChosen([]);
        if(data.length > 1) {
            getColumns();
            getRows();
        }
    },[data])
    //on deletion, make sure delete button is hidden
    useEffect(() => {
        setShow(false);
        setChosen([]);
    },[rows])
    /////////////////////////////////////////////////////////////////////////////////////////////



    const host = `http://192.168.1.118:3000`;
    //////////REQUESTS/////////////////////
    const getData = async() => {
        // setShow(false);
        // setChosen([]);
        //determine route -> db table based on pageSelection
        let route = page.toLowerCase();
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
        if(page === 'Housing'){
            cols = Tables.housing();
        } else if(page === 'Char'){
            cols = Tables.char();
        } else if(page === 'Option'){
            cols = Tables.option();
        } else if(page === 'Char_Op'){
            cols = Tables.char_op();
        } else if(page === 'Connection'){
            cols = Tables.connection();
        } else if(page === 'Sensor'){
            cols = Tables.sensor();
        } else if(page === 'Custom'){
            cols = Tables.custom();
        } else if(page === 'Xproto'){
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
                setChosen([]);
            }else {
                setShow(true);
                let row = id[0];
                console.log({row})
                setChosen(row);
            }
        },
        [rows],
    ); 

    const handleDelete = () => {
        let id = chosenRow;
        //delete entry from database;
        axios.delete(`${host}/${page}/${id}`)//, id)
        .then(response => {
            console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
        //get modified data
        //update rows state to uncheck selection immediately, remove row immediately, and on page switch
        let temp = JSON.parse(JSON.stringify(rows));//deep copy allows deletion
        //find id in temp;
        //TODO!!!!!!!!!!!!!!!!!!!!!!!
        //do we have to iterate if we now the row/ID??????????
        for(let i = 0; i < temp.length; i++){
            if(temp[i].id === id){
                temp.splice(i,1);
            }
        }
        //update state
        setRows(temp);
    }
    // const createSimilar = () => {
    //     //transfer current selection data to a modal with prefilled forms... 

    // }
    // const handleOpen = () => {
    //     setOpen(true);
    // };
    
    // const handleClose = () => {
    //     setOpen(false);
    // };
    const onSubmit = (event) => {
        event.preventDefault(event);
        console.log(event.target);
        let data = event.target.children; //HTMLCollection
        console.log(data)
        let vals = [];
        let cols = [];
        for(let i = 0; i < data.length - 1; i++){ //reduce array length since we removed id earlier
            // console.log(data[i]) //only care about value???
            // //lets store in an array for now...
            // let temp = `'${data[i].value}'`;//''+data[i].value+'';
            // vals.push(temp);
            // cols.push(data[i].name);
            //this is different now that we are using textarea...
            let focus = data[i].innerText;
            let val = data[i].children[focus].value;
            let temp = `'${val}'`;
            vals.push(temp);
            cols.push(focus);
        };
        let vString = vals.join();
        let cString = cols.join();
        console.log(cString, vString)
        let route = page;
        axios.post(`${host}/${route}`, {params: {vString, cString}})
          .then(response => {
            console.log(response);
          })
          .catch(error => {
            console.log(error);
          });
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
                        <div className="buttons">
                                <FreshSensor
                                    // data={rows[chosenRow]}
                                    data={rows[0]}//need for column names
                                    onSubmit={onSubmit}
                                    //fields={columns}DONT NEED
                                />
                                {!!deleteShow && 
                                    <div>
                                        <button onClick={handleDelete}>DELETE</button>
                                        <NewSensor
                                            // data={rows[chosenRow]}
                                            data={rows[chosenRow - 1]}
                                            onSubmit={onSubmit}
                                            //fields={columns}DONT NEED
                                        />
                                    </div>    
                                }
                        </div>
                        {/* <div className = "addData">
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
                        </div> */}
                    </div>
                }
            </div>
        </div>
    )
};

export default App;