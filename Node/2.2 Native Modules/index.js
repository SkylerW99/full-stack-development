const fs = require('node:fs');

const content = "Some content!";

fs.writeFile("Skylar.txt", content,err =>{
    if(err){
        console.error(err);
    } else{
        console.log("File created successfully.");
    }
})

fs.readFile("message.txt",'utf8',(err,data) =>{
    if(err){
        console.error(err);
        return;
    }
    console.log(data);
});