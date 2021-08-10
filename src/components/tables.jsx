import { TableSortLabel } from '@material-ui/core';
import { DataGrid, GridRowsProp, GridColDef, getInitialGridRowState } from '@material-ui/data-grid';

const Tables = {
    housing: () => {
        let format = [
            {
                field: 'id',
                hide: true,
            },
            {
                field: 'housing_code',
                headerName: 'Code',
                width: 125,
                editable:true,
            },
            {
                field: 'part_number',
                headerName: 'Part #',
                width: 150,
                editable:true,
            },
            {
                field: 'rev',
                headerName: 'Rev',
                width: 105,
                editable:true,
            },
            {
                field: 'title',
                headerName: 'Description',
                flex: 1,
                minWidth: 500,
                resizable: true,
                editable:true,
            },
            {
                field: 'web_valid',
                headerName: 'Web Valid',
                width: 145,
                editable:true,
            },
            {
                field: 'png_file',
                headerName: 'PNG',
                width: 150,
                editable:true,
            },
            {
                field: 'mech_file',
                headerName: 'Mech',
                width: 150,
                editable:true,
            }
        ]
        return format;
    },
    //////////////////////////////////////////////////////////////////////
    char: () => {
        let format = [
            {
                field: 'id',
                hide: true,
            },
            {
                field: 'char_code',
                headerName: 'Code',
                width: 125,
                editable:true,
            },
            {
                field: 'title',
                headerName: 'Description',
                flex: 1,
                minWidth: 500,
                resizable: true,
                editable:true,
            },
            {
                field: 'type',
                headerName: 'Type',
                width: 125,
                editable:true,
            },
            {
                field: 'type_description',
                headerName: 'Type Description',
                width: 400,
                editable:true,
            },
            {
                field: 'web_valid',
                headerName: 'Web Valid',
                width: 145,
                editable:true,
            },
            {
                field: 'bullet_file',
                headerName: 'Bullet HTML',
                width: 175,
                editable:true,
            },
        ]
        return format;
    },
    //////////////////////////////////////////////
    option: () => {
        let format = [
            {
                field: 'id',
                hide: true,
            },
            {
                field: 'option_code',
                headerName: 'Code',
                width: 125,
                editable:true,
            },
            {
                field: 'title',
                headerName: 'Description',
                flex: 1,
                minWidth: 500,
                resizable: true,
                editable:true,
            },
            {
                field: 'web_valid',
                headerName: 'Web Valid',
                width: 145,
                editable:true,
            },
            {
                field: 'png_file',
                headerName: 'PNG',
                width: 150,
                editable:true,
            },
        ]
        return format;
    },
    //////////////////////////////////////////////////////////////////
    char_op: () => {
        let format = [
            {
                field: 'id',
                hide: true,
            },
            {
                field: 'char_op_code',
                headerName: 'Char-Option',
                width: 200,
                editable:true,
            },
            {
                field: 'option_code',
                headerName: 'Option',
                width: 125,
                editable:true,
            },
            {
                field: 'rev',
                headerName: 'Rev',
                width: 105,
                editable:true,
            },
            {
                field: 'title',
                headerName: 'Description',
                flex: 1,
                minWidth: 500,
                resizable: true,
                editable:true,
            },
            {
                field: 'web_valid',
                headerName: 'Web Valid',
                width: 145,
                editable:true,
            },
            {
                field: 'png_file',
                headerName: 'PNG',
                width: 150,
                editable:true,
                resizable: true,
            },
        ]
        return format;
    },
    ///////////////////////////////////////////////////////////////////////
    connection: () => {
        let format = [
            {
                field: 'id',
                hide: true,
            },
            {
                field: 'connection_code',
                headerName: 'Connection',
                width: 200,
                editable:true,
            },
            {
                field: 'web_code',
                headerName: 'Web Code',
                width: 200,
                editable:true,
            },
            {
                field: 'rev',
                headerName: 'Rev',
                width: 105,
                editable:true,
            },
            {
                field: 'title',
                headerName: 'Description',
                flex: 1,
                minWidth: 500,
                resizable: true,
                editable:true,
            },
            {
                field: 'part_number',
                headerName: 'Part #',
                width: 150,
                editable:true,
            },
            {
                field: 'png_file',
                headerName: 'PNG',
                minWidth: 150,
                editable:true,
                resizable: true,
            },
        ]
        return format;
    },
    ///////////////////////////////////////////////////////////////////////
}
export default Tables;