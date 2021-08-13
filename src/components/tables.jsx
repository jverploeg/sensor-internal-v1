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
                width: 175,
                editable:true,
            },
            {
                field: 'web_code',
                headerName: 'Web Code',
                width: 175,
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
            },
        ]
        return format;
    },
    ///////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////
    sensor: () => {
        let format = [
            {
                field: 'id',
                hide: true,
            },
            {
                field: 'sensor_code',
                headerName: 'Code',
                width: 200,
                editable:true,
            },
            {
                field: 'part_number',
                headerName: 'Part #',
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
                headerName: 'Description',//can we split this into an array to fully display?
                flex: 1,
                minWidth: 500,
                editable:true,
            },
            {
                field: 'char',
                headerName: 'Char',
                width: 125,
                editable:true,
            },
            {
                field: 'type',
                headerName: 'Type',
                width: 125,
                editable:true,
            },
            {
                field: 'wizard_part',
                headerName: 'Wizard Part',
                width: 165,
                editable:true,
            },
        ]
        return format;
    },
    ///////////////////////////////////////////////////////////////////////
    custom: () => {
        let format = [
            {
                field: 'id',
                hide: true,
            },
            {
                field: 'custom_sensor_code',
                headerName: 'Code',
                width: 200,
                editable:true,
            },
            {
                field: 'part_number',
                headerName: 'CS #',
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
                editable:true,
            },
            {
                field: 'housing',
                headerName: 'Housing',
                width: 125,
                editable:true,
            },
            {
                field: 'char',
                headerName: 'Char',
                width: 125,
                editable:true,
            },
            {
                field: 'option',
                headerName: 'Option',
                width: 125,
                editable:true,
            },
            {
                field: 'connection',
                headerName: 'Connection',
                width: 125,
                editable:true,
            },
            {
                field: 'conn_chart',
                headerName: 'Conn Chart',
                width: 125,
                editable:true,
            },
            {
                field: 'spec_chart',
                headerName: 'Spec Chart',
                width: 125,
                editable:true,
            },
            {
                field: 'picture',
                headerName: 'Picture',
                width: 125,
                editable:true,
            },
        ]
        return format;
    },
    ///////////////////////////////////////////////////////////////////////
    xproto: () => {
        let format = [
            {
                field: 'id',
                hide: true,
            },
            {
                field: 'xproto_code',
                headerName: 'Code',
                width: 175,
                editable:true,
            },
            {
                field: 'xproto_part_number',
                headerName: 'Xproto #',
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
                minWidth: 400,
                editable:true,
            },
            {
                field: 'notes',
                headerName: 'Notes',
                flex: 1,
                minWidth: 300,
                editable:true,
            },
            {
                field: 'housing',
                headerName: 'Housing',
                width: 125,
                editable:true,
            },
            {
                field: 'char',
                headerName: 'Char',
                width: 125,
                editable:true,
            },
            {
                field: 'opt',
                headerName: 'Option',
                width: 125,
                editable:true,
            },
            {
                field: 'connection',
                headerName: 'Connection',
                width: 125,
                editable:true,
            },
        ]
        return format;
    },    
    
}
export default Tables;