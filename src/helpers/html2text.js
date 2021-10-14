//function for parsing .html bullets and description files into text

const html2text = (option, data) => {
    if(option === 1) {
        //bullets
<<<<<<< HEAD
        if(!data){
            var bullets_html = require(`/Users/jverploeg/Desktop/webApp/images/pdf_bullets/${char}.html`).default;
            var tester = bullets_html.split('\n');
        } else {
            var tester = data.split('\n');
        }
        let final = [];
        tester.pop();
        tester.shift();
        let inputs = JSON.parse(JSON.stringify(tester));
=======
        let temp =  data.split('\n');
        let result = [];
        temp.pop();
        temp.shift();
        let inputs = JSON.parse(JSON.stringify(temp)); //deep copy to modify
>>>>>>> bfc76fed7e1aa3b892e070865117e5f94821f45a
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

<<<<<<< HEAD
    } else if(option === 2) {
        //description
        const description_html = require(`/Users/jverploeg/Desktop/webApp/images/descriptions/${char}.html`).default;
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
            var html = require(`/Users/jverploeg/Desktop/webApp/images/descriptions/${char}.html`).default;
        } else {
            var html = data;
        }
=======
    }else if(option === 2) {
        //raw html file
<<<<<<< HEAD
        
>>>>>>> bfc76fed7e1aa3b892e070865117e5f94821f45a
=======

>>>>>>> 289b222a0b0cd236a4dde821a499abaea5a11543
        //remove unicode
        let raw = data.replace(/[\uFFFD]/g, ' ');//additional unicode symbols???
        return raw;
    }
}
export default html2text;

        //TODO: need to remove unneccessary newline gaps...............
        /////////////NO fix html files when issues with description not fitting on page!!!!!!

            // console.log({data})
            // let temp =  data.split('\n');
            // console.log({temp})
            // let result = [];
            // //iterate through and remove lines with \t
            // for (let i = 0; i < temp.length; i++){
            //     let focus = temp[i];
            //     let first = focus.slice(0,1);//focus.slice(0,2);
            //     //console.log({first})
            //     if(first !== '\t'){
            //         result.push(focus);
            //     }
            // }
            // let final = result.join('\n');
            // console.log({final})
            //let raw2 = final.replace(/[\uFFFD]/g, ' ');//additional unicode symbols???