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
        
        //remove unicode
        let raw = data.replace(/[\uFFFD]/g, ' ');//additional unicode symbols???
        return raw;
    } 
}
export default html2text;