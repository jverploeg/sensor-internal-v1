const convert = {
    createMarkup: (input) => {
        return {__html: input};
    },
    images: (data) => {
        let template = {
            type: '',
            mech: '',
            housing: '',
            option: '',
            connect: '',
            conn_chart: '',
            spec_chart: '',
            picture: '',
        }
        let convertedArray = [];
        //iterate through array buffer and convert to base64
        for(let i = 0; i < data.length; i++){
            if(data[i] !== null ){
                let base64 = btoa(
                    new Uint8Array(data[i]).reduce(
                        (data, byte) => data + String.fromCharCode(byte),
                        '',
                    ),
                );
                //append data format declaration and add to object;
                convertedArray[i] = ( "data:;base64," + base64 );
            } else {
                convertedArray[i] = undefined;
            }

        }
        //save to template... -> better way to do this????
        template.type = convertedArray[0];
        template.mech = convertedArray[1];
        template.housing = convertedArray[2];
        template.option = convertedArray[3];
        template.connect = convertedArray[4];
        template.conn_chart = convertedArray[5];
        template.spec_chart = convertedArray[6];
        template.picture = convertedArray[7];
        
        return template;
    },


}
export default convert;