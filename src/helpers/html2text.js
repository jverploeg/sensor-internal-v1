//function for parsing .html bullets and description files into text

const html2text = (option, char, data) => {
    if(option === 1) {
        //bullets
        if(!data){
            var bullets_html = require(`D:/DATA/Sensor/webApp/images/pdf_bullets/${char}.html`).default;
            //var bullets_html = axios.get(`${host}/html/bullets/${char}`);
            var tester = bullets_html.split('\n');
        } else {
            var tester = data.split('\n');
        }
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
                final.push('o     ' + temp);//change 2 spaces to 3? 5 spaces currently
            }
        }
        return final;

    } else if(option === 2) {
        //description
        const description_html = require(`D:/DATA/Sensor/webApp/images/descriptions/${char}.html`).default;
        //const description_html = axios.get(`${host}/html/description/${char}`);
        var spec_text = description_html.replace(/<[^>]+>/g, '');
        spec_text = spec_text.replace(/\&nbsp\;/g, '');
        spec_text = spec_text.replace(/Title/, '');
        spec_text = spec_text.replace(/\n{2,8}/g, '');
        spec_text = spec_text.replace(/\t/g, '');
        let text_array = spec_text.split("\n\n");//'\n');("\\r?\\n")
        let temp = [];
        for(let i = 0; i < text_array.length; i++) {
            let focus = text_array[i]
            if(focus.length > 1) {
                let inner = focus.replace(/ \n/g, ' ');//get rid of new lines between words
                inner = inner.replace(/\n/g, ' '); //replace line breaks between words without a space with a space
                let indent = '     ';//5spaces?
                inner = indent.concat(inner)
                temp.push(inner);
            }
        }
        let output = temp.join('\n\n');//turn the array back into a text block with line breaks between paragraphs
        return output;
    }  else if(option === 3) {
        //raw html file
        if(!data) {
            var html = require(`D:/DATA/Sensor/webApp/images/descriptions/${char}.html`).default;
        } else {
            var html = data;
        }
        //remove unicode
        let raw = html.replace(/[\uFFFD]/g, ' ');//additional unicode symbols???
        return raw;
    } 
}
export default html2text;