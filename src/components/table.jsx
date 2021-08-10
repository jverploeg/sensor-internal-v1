// FUNCTIONAL DEPENDENCIES
import React, { useState, useEffect, useCallback } from 'react';
import MaterialTable from 'material-table';


function Basic(props) {
    let page = props.title;
    // let cols = props.columns;//.columns
    let rows = props.data;//.data;
    let cols = Object.keys(rows[0]);
    let temp = {};
    let formattedCols = [];
    for(let i=0; i < cols.length; i++ ){
      //let s = cols[0].toUpperCase();
      temp.title = cols[i];
      temp.field = cols[i];
      formattedCols.push(temp);
      temp = {};
    }
    console.log(formattedCols)
    return (
      <MaterialTable
        //title="Basic Filtering Preview"
        title={page}
        columns={formattedCols}
        data={rows}        
        options={{
          filtering: true
        }}
      />
    )
}
export default Basic;  

//https://material-table.com/#/docs/features/editable
//https://www.gitmemory.com/issue/mbrn/material-table/1754/603019449
//https://github.com/mbrn/material-table/issues/1748
//https://stackoverflow.com/questions/60798675/react-material-table-is-rerendering-table-with-new-data-only-if-i-update-data-tw
//https://material-table.com/#/docs/features/remote-data