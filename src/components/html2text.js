//function for parsing catalog .html bullets and description files into text

const convertToPlain= (html) => {

    // Create a new div element
    var tempDivElement = document.createElement("div");

    // Set the HTML content with the given value
    tempDivElement.innerHTML = html;

    // Retrieve the text property of the element 
    return tempDivElement.textContent || tempDivElement.innerText || "";
}
const html2text = (option, char, text) => {
    if(option === 1) {
        //bullets
        const bullets_html = require(`D:/DATA/Sensor/webApp/images/pdf_bullets/${char}.html`).default;
        let tester = bullets_html.split('\n');
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
        // const test = convertToPlain(description_html)//same as after step 1 below
        // console.log(test)
        //console.log(description_html)
        //regex to modify
        var spec_text = description_html.replace(/<[^>]+>/g, '');
        //console.log(spec_text)
        spec_text = spec_text.replace(/\&nbsp\;/g, '');
        //console.log(spec_text)
        spec_text = spec_text.replace(/Title/, '');
        //console.log(spec_text)
        spec_text = spec_text.replace(/\n{2,8}/g, '');
        //console.log(spec_text)
        spec_text = spec_text.replace(/\t/g, '');
        //console.log(spec_text)
        let text_array = spec_text.split("\n\n");//'\n');("\\r?\\n")
        //console.log(text_array);
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
        //console.log(temp);
        let output = temp.join('\n\n');//turn the array back into a text block with line breaks between paragraphs
        //console.log(output)
        return output;
    } else if(option === 3) {
        //description array for preview
        //take output from above and split into array
        let text_array = text.split("\n\n");
        //console.log(text_array);

        return text_array;
    } 
}
export default html2text;


//https://stackoverflow.com/questions/37521893/determine-if-a-path-is-subdirectory-of-another-in-node-js