//sensor & part checking logic
import axios from 'axios';
//path
const host = `http://192.168.1.118:3000`;


const check = {
    type: (input) => {
        let temp = input;
        let type = '';
        let first = temp.slice(0,1);
    
        if(first === 'C') { //no catalog housings start with C...
            type = 'custom';
        } else if (first === 'X'){
            type = 'xproto';
        } else {
            type = 'catalog'
        }
        return type;
    },
    valid: async(type, code) => {
        //check if sensor exists in the database
        try {
            const { data } = await axios.get(`${host}/valid/${type}/${code}`);
            return data.rowCount;
        } catch(error) {
            console.log(error)
        }
    },
}
export default check;