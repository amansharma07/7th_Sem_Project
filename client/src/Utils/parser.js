const fs = require('fs');
const pdf = require('pdf-parse');

// default render callback
function render_page(pageData) {
    //check documents https://mozilla.github.io/pdf.js/
    let render_options = {
        //replaces all occurrences of whitespace with standard spaces (0x20). The default value is `false`.
        normalizeWhitespace: false,
        //do not attempt to combine same line TextItem's. The default value is `false`.
        disableCombineTextItems: false
    }
 
    return pageData.getTextContent(render_options)
    .then(function(textContent) {
        let lastY, text = '';
        for (let item of textContent.items) {
            if (lastY == item.transform[5] || !lastY){
                text += item.str;
            }  
            else{
                text += '\n' + item.str;
            }    
            lastY = item.transform[5];
        }
        return text;
    });
}
 
let options = {
    pagerender: render_page
}
 
//let dataBuffer = fs.readFileSync('Transcript.pdf');
let dataBuffer = fs.readFileSync('Certificate.pdf');
 
pdf(dataBuffer,options).then(function(data) {
    console.log(data.numpages);
    console.log(data.info);
    console.log(data.text);
});