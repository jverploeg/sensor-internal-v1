// FUNCTIONAL DEPENDENCIES
import React, { useState, useEffect, useCallback } from 'react';
import MaterialTable from 'material-table';


function Basic(page, columns, rows) {
    console.log(page,columns,rows)
    return (
      <MaterialTable
        //title="Basic Filtering Preview"
        title={page}
        columns={[
            columns
        ]}
        data={[
            rows
        ]}        
        options={{
          filtering: true
        }}
      />
    )
}
export default Basic;  