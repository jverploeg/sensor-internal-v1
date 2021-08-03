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
        //let result = true;
        try {
            const { data } = await axios.get(`${host}/valid/${type}/${code}`);
            let found = data.rowCount;
            console.log({found})
            return found;
            // if(found === 0) {result = false};
            // return result;
            // Promise.resolve(result)
            // .then(() => {
            //     return result;
            // })
        } catch(error) {
            console.log(error)
        }
        // Promise.resolve(data)
        // .then(() => {
        //     return result;
        // })
    },
    // valid: (type, code) => {
    //     //check if sensor exists in the database
    //     let found = true;
    //     axios.get(`${host}/valid/${type}/${code}`)
    //     .then((result) => {
    //         console.log(result.data)
    //         let rows = result.data.rowCount;
    //         if(rows === 0) {found = false};
    //         console.log(found)
    //         return found;
    //     })
    // },
}
export default check;