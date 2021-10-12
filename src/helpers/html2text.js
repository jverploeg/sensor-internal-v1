//function for parsing .html bullets and description files into text

const html2text = (option, data) => {
    if(option === 1) {
        //bullets
        let temp =  data.split('\n');
        let result = [];
        temp.pop();
        temp.shift();
        let inputs = JSON.parse(JSON.stringify(temp)); //deep copy to modify
        for (let i = 0; i < inputs.length; i++){
            //replace any list items
            let focus = inputs[i].replace(/<[^>]+>/g, '');
            focus = focus.replace(/\r/g, '');
            //replace /r formatting
            if(focus.length > 3){
                result.push('o     ' + focus);//change 2 spaces to 3? 5 spaces currently
            }
        }
        return result;

    }else if(option === 2) {
        //raw html file
        //TODO: need to remove unneccessary newline gaps...............
        console.log({data})
        let temp =  data.split('\n');
        console.log({temp})
        let result = [];
        //iterate through and remove lines with \t
        for (let i = 0; i < temp.length; i++){
            let focus = temp[i];
            let first = focus.slice(0,1);//focus.slice(0,2);
            //console.log({first})
            if(first !== '\t'){
                result.push(focus);
            }
        }
        let final = result.join('\n');
        console.log({final})
        //remove unicode
        let raw = data.replace(/[\uFFFD]/g, ' ');//additional unicode symbols???
        //let raw2 = final.replace(/[\uFFFD]/g, ' ');//additional unicode symbols???
        return raw;
    } 
}
export default html2text;