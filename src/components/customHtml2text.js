const CustomHTML = (option, data) => {
    if(option === 1) {
        //bullets
        let tester = data.split('\n');
        let final = [];
        tester.pop();
        tester.shift();
        let inputs = JSON.parse(JSON.stringify(tester));
        for (let i = 0; i < inputs.length; i++){
            //replace any list items
            var temp = inputs[i].replace(/<[^>]+>/g, '');
            temp = temp.replace(/\r/g, '');
            //replace /r formatting
            if(temp.length > 3){
                final.push('o  ' + temp);
            }
        }
        return final;

    } else if(option === 2) {
        //description
        //regex to modify
        var spec_text = data.replace(/<[^>]+>/g, '');
        spec_text = spec_text.replace(/\&nbsp\;/g, '');
        spec_text = spec_text.replace(/Title/, '');
        spec_text = spec_text.replace(/\n{2,8}/g, '');
        spec_text = spec_text.replace(/\t/g, '');
        let s_text = spec_text.split("\n\n");//'\n');("\\r?\\n")
        return s_text;
    } 

}
export default CustomHTML;    