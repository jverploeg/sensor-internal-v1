const checkType = (input) => {
    let temp = input;
    let type = '';
    let first = temp.slice(0,1);

    if(first === 'C') {
        type = 'custom';
    } else if (first === 'X'){
        type = 'xproto';
    } else {
        type = 'standard'
    }
    return type;
}
export default checkType;