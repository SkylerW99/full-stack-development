import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const apiKey = "Tq4RWwRvet4UUi5xqfhNFngS4N4FSOxXw5GaGQ9t";

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

//API test
/*
app.get("/", async (req, res) => {
  try {
    console.log("GET /");
    const result = await axios.get(
      `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`
    );
    console.log(result.data);
    res.render("index.ejs"); 
  } catch (error) {
    if (error?.response) {
      console.error("NASA error:", error.response.status, error.response.data);
    } else {
      console.error("Request failed:", error.message);
    }
    res.status(502).send("Upstream NASA API error."); // always send a body
  }
});
*/


//conditional apod API link
const apod = (date) =>
  `https://api.nasa.gov/planetary/apod?api_key=${apiKey}` +
  (date ? `&date=${date}` : "");

//picture of today
app.get("/", async (req, res) => {
  try {
    const myBirthday = req.query.birthday;
    console.log(myBirthday);

    //today's pic
    const todayPic = axios.get(apod());

    //fetch bday if available
    const bdPic = myBirthday ? axios.get(apod(myBirthday)) : null;

    const [todayRes, bdRes] = await Promise.all(
      [todayPic, bdPic].filter(Boolean)
    );

    const today = todayRes.data;
    const birthday = bdRes?.data;

    //fetch rover photos for today
    const roverPhotos = await axios.get(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${today.date}&page=1&api_key=${apiKey}`
    );
    console.log(roverPhotos.data.photos);

    res.render("index.ejs", {
      //today
      tdDate: today.date,
      tdExplanation: today.explanation,
      tdTitle: today.title,
      tdImage: today.hdurl,

      //birthday if available
      bdDate: birthday?.date,
      bdExplanation: birthday?.explanation,
      bdTitle: birthday?.title,
      bdImage: birthday?.hdurl,

      //rovers photos
      roverPhotos: roverPhotos.data.photos,
    });
  } catch (error) {
    if (error?.response) {
      console.error(error.response.status, error.response.data);
    } else {
      console.error(error.message);
    }
    return res.status(500).send("Server error.");
  }
});

app.post("/birthday", async (req, res) => {
  const bday = req.body.birthday;
  return res.redirect(`/?birthday=${encodeURIComponent(bday)}`);
});


app.listen(port, () => {
  console.log(`Server is running on ${port}.`);
});

