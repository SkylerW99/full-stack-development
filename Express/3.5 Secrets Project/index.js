//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming

import bodyParser from "body-parser";
import express from "express";
const port = 3000;
const app = express();
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(bodyParser.urlencoded({extended:true}));

  //check password
var authenticated = false;

  function checkPassword(req,res,next){
    if (req.body["password"]=="Love"){
        authenticated = true;
        //res.sendFile(__dirname +"/public/secret.html");
    };
    next();
}
app.use(checkPassword);


app.get('/',(req,res)=>{
    res.sendFile(__dirname +"/public/index.html");
})

app.post('/check',(req,res)=>{
    if (authenticated == true){
        res.sendFile(__dirname+"/public/secret.html");
    } else{
        res.sendFile(__dirname+"/public/index.html");
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });

