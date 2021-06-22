// FUNCTIONAL DEPENDENCIES
import React, { useState, useEffect, useCallback } from 'react';
import { DataGrid, GridRowsProp, GridColDef } from '@material-ui/data-grid';

// STYLE PARAMETERS
// const useStyles = makeStyles(
//     (theme) => {
//       const isDark = getThemePaletteMode(theme.palette) === 'dark';
  
//       return {
//         root: {
//           '& .MuiDataGrid-cellEditing': {
//             backgroundColor: 'rgb(255,215,115, 0.19)',
//             color: '#1a3e72',
//           },
//           '& .Mui-error': {
//             backgroundColor: `rgb(126,10,15, ${isDark ? 0 : 0.1})`,
//             color: isDark ? '#ff4343' : '#750f0f',
//           },
//         },
//       };
//     },
//     { defaultTheme },
//   );

  
const ControlGrid = (rows, columns) => {
  
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
      });
  
    return (
      <div className = "foot" style={{ height: 400, width: '100%' }}>
        {!!rows &&
            <DataGrid
                columns={columns}
                rows={rows}
                onEditCellChangeCommitted={handleEditCellChangeCommitted}
            />
        }
      </div>
    );
}

export default ControlGrid;