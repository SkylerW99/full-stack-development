

import axios from "axios";
import express from "express";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.get('/',async(req,res) => {
  try {
    const result = await axios.get('https://secrets-api.appbrewery.com/random');
    console.log(result.data.secret);
    res.render("index.ejs",{
        secret: result.data.secret,
        username: result.data.username
    });
  } catch (error) {
    console.log(error.response.data); //for debug
    res.status(500); //for user
  }
});



app.listen(port,()=>{
console.log(`The server is running on port ${port}`);
})



