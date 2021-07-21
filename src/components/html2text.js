//function for parsing

const html2text = (option, char) => {
    if(option === 1) {
        //bullets
        const bullets_html = require(`D:/DATA/Sensor/webApp/images/pdf_bullets/${char}.html`).default;//char
        console.log(bullets_html)
        let tester = bullets_html.split('\n');
        console.log({tester})
        let final = [];
    
        tester.pop();
        tester.shift();
        console.log({tester})
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
        console.log({final})
        return final;

    } else if(option === 2) {
        //description
        const description_html = require(`D:/DATA/Sensor/webApp/images/descriptions/${char}.html`).default;
        //regex to modify
        var spec_text = description_html.replace(/<[^>]+>/g, '');
        spec_text = spec_text.replace(/\&nbsp\;/g, '');
        spec_text = spec_text.replace(/Title/, '');
        spec_text = spec_text.replace(/\n{2,8}/g, '');
        spec_text = spec_text.replace(/\t/g, '');
        //console.log(spec_text)
        let s_text = spec_text.split("\n\n");//'\n');("\\r?\\n")
        console.log({s_text})
        return s_text;
    }

}
export default html2text;