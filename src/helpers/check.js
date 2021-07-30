//sensor & part checking logic
const check = {
    type: (input) => {
        let temp = input;
        let type = '';
        let first = temp.slice(0,1);
    
        if(first === 'C') {
            type = 'custom';
        } else if (first === 'X'){
            type = 'xproto';
        } else {
            type = 'catalog'
        }
        return type;
    },
}
export default check;