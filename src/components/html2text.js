//function for parsing

//axios for custom waterfall calls
import axios from 'axios';

const checker = async(file1, file2) => {
    try {
        const found1 = await require(`D:/DATA/Sensor/webApp/images/pdf_bullets/${file1}.html`).default;
        return found1;
    } catch(error) {
        try {
            const found2 = await require(`D:/DATA/Sensor/webApp/images/pdf_bullets/${file2}.html`).default;
            return found2;
        } catch(error) {
            console.log(error)
        }
    }
}
const checker2 = (file1, file2) => {
    try {
        const found1 = require(`D:/DATA/Sensor/webApp/images/pdf_bullets/${file1}.html`).default;
        return found1;
    } catch(error) {
        try {
            const found2 = require(`D:/DATA/Sensor/webApp/images/pdf_bullets/${file2}.html`).default;
            return found2;
        } catch(error) {
            console.log(error)
        }
    }
}
const waitForPromise = (f1,f2) => { //async
    // let result = await any Promise, like:
    let temp = checker(f1,f2)
    .then((result) => {
        console.log('result',result);//, temp)
        return result;
    })
    // let result = await Promise.resolve(checker(f1,f2));
    // return result;
}
const waitForPromise2 = (f1,f2) => { //async
    // let result = await any Promise, like:
    let temp = checker2(f1,f2)
    .then((result) => {
        console.log('result',result);//, temp)
        return result;
    })
    // let result = await Promise.resolve(checker(f1,f2));
    // return result;
}
const html2text = (option, char, sensor) => {
    if(option === 1) {
        //bullets
        //const bullets_html = '';
        //const bullets_html = require(`D:/DATA/Sensor/webApp/images/pdf_bullets/${char}.html`).default;
        //var bullets1 = require(`D:/DATA/Sensor/webApp/images/pdf_bullets/${sensor}.html`);


        // var bullets2 = require(`D:/DATA/Sensor/webApp/images/pdf_bullets/${char}.html`);
        // console.log('custom', bullets1.value);
        // console.log('char', bullets2);

        //check for custom first
        if(sensor) {
            //var bullets1 = checker(sensor, char);
            //var bullets1 = waitForPromise(sensor, char);
            // var bullets1 = async() => {
            //     await checker(sensor, char)
            // }
            // console.log(bullets1);//waitB1)
            let waitB1 = waitForPromise(sensor, char)
            // .then((result) => {
            //     console.log(result);
            // })
            console.log(waitB1);
            setTimeout(1000)
            console.log(waitB1)
            // let waitB2 = waitForPromise2(sensor, char)
            // .then((result) => {
            //     console.log(result);
            // })
            // console.log(waitB2);

            //var bullets_html = require(`D:/DATA/Sensor/webApp/images/pdf_bullets/${sensor}.html`).default;
            //var bullets_html = checker(sensor); // check if file exists in directory
            // if(bullets1 === undefined){
            //     bullets_html = require(`D:/DATA/Sensor/webApp/images/pdf_bullets/${char}.html`).default;
            // } else {
            //     bullets_html = bullets1;
            // }
        } else {
            var bullets_html = require(`D:/DATA/Sensor/webApp/images/pdf_bullets/${char}.html`).default;
        }
        console.log(bullets_html)
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
                final.push('o  ' + temp);
            }
        }
        return final;

    } else if(option === 2) {
        //description
        //const description_html = '';
        //const description_html = require(`D:/DATA/Sensor/webApp/images/descriptions/${char}.html`).default; // || csxxx.html? TODO
        //check for custom first

        if(sensor) {
            var description_html = require(`D:/DATA/Sensor/webApp/images/descriptions/${sensor}.html`).default;
            if(description_html.length < 1){
                description_html = require(`D:/DATA/Sensor/webApp/images/descriptions/${char}.html`).default;
            }
        } else {
            var description_html = require(`D:/DATA/Sensor/webApp/images/descriptions/${char}.html`).default;
        }

        //regex to modify
        var spec_text = description_html.replace(/<[^>]+>/g, '');
        spec_text = spec_text.replace(/\&nbsp\;/g, '');
        spec_text = spec_text.replace(/Title/, '');
        spec_text = spec_text.replace(/\n{2,8}/g, '');
        spec_text = spec_text.replace(/\t/g, '');
        let s_text = spec_text.split("\n\n");//'\n');("\\r?\\n")
        return s_text;
    } 
    // else if(option === 3) {

    // }
}
export default html2text;


//https://stackoverflow.com/questions/37521893/determine-if-a-path-is-subdirectory-of-another-in-node-js