import express from "express";
import ejs from "ejs";
const app = express();
const port = 3000;
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const today = new Date();
let day = today.getDay();

app.get('/',(req,res)=>{
    let type = "a weekday";
    let adv = "work hard";

    if (day === 0 || day === 6){
        type = "weekend";
        adv = "play hard";
    }

    res.render("index.ejs",{
        dayType: type,
        advice: adv
    })
})

app.listen(port,()=>{
    console.log(`Server running in port ${port}`);
})


