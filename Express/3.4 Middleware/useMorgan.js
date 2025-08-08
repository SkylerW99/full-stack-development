import express from "express";
import morgan from "morgan";

const app = express();
const port = 3000;

app.use(morgan("dev"));


app.get("/",(req,res)=>{
  res.send("hello");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
