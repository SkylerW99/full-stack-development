/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

//const fs = require ('node:fs');
import {input} from '@inquirer/prompts';

//get answer
const answer = {
    name: await input({ message: 'Enter your name:' }),
    link: await input({ message: 'Enter your portfolio link:' }),
}
console.log(answer);

// Convert the object to a JSON string
const answerString = JSON.stringify(answer, null, 2);


//store into txt file
import {writeFile} from 'fs';
writeFile('answer.txt',answerString, err=>{
    if (err) {
        console.error(err);
      } else {
        console.log("file written successfully.")
      }
})


//create QR code image
import qr from "qr-image";
import {createWriteStream} from 'fs';

const qr_svg = qr.image(answer.link, { type: 'png' });
qr_svg.pipe(createWriteStream(`${answer.name}Portfolio.png`));
 
