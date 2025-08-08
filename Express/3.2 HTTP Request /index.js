import express from "express";
const app = express();
const port = 3000;

app.get("/", (req,res)=>{
    res.send("<h2>hello, Skylar.</h2>");
});

app.get("/about",(req,res)=>{
    res.send("<h2>About Page</h2>")
})

app.get("/products",(req,res)=>{
    res.send("<h1>Products and offerings</h1>");
})

app.listen(port, ()=>{
    console.log(`Example app listening on port ${port}.`);
})
