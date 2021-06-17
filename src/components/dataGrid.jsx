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

  
const RowModelControlGrid = (rows, columns) => {
    const [editRowsModel, setEditRowsModel] = useState({});
  
    const handleEditCellChange = useCallback(
      ({ id, field, props }) => {
          const data = props; // Fix eslint value is missing in prop-types for JS files
          const newState = {};
          newState[id] = {
            ...editRowsModel[id],
          };
          setEditRowsModel((state) => ({ ...state, ...newState }));
        },
      [editRowsModel],
    );
  
    return (
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          // className={classes.root}
          rows={rows}
          columns={columns}
          editRowsModel={editRowsModel}
          onEditCellChange={handleEditCellChange}
        />
      </div>
    );
}

export default RowModelControlGrid;