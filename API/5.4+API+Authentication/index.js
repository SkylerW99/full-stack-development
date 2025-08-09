import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "SkylarWang";
const yourPassword = "ziyiziyi";
const yourAPIKey = "b7543855-21f1-4a44-8f10-a4a4451c58e4";
const yourBearerToken = "00aab2bf-97f9-45ce-9ef3-48c7f63fb88e";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  //TODO 2: Use axios to hit up the /random endpoint
  //The data you get back should be sent to the ejs file as "content"
  //Hint: make sure you use JSON.stringify to turn the JS object from axios into a string.
    try {
    const response = await axios.get(`${API_URL}random`);
    const result = JSON.stringify(response.data);
    console.log(result);
    res.render("index.ejs", { content: result});
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

app.get("/basicAuth", async (req, res) => {
    try {
    const response = await axios.get(`${API_URL}all?page=2`, {
      auth:{
        username: yourUsername,
        password: yourPassword
      },
    });
    const result = JSON.stringify(response.data);
    console.log(result);
    res.render("index.ejs", { content: result});
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }

});

app.get("/apiKey", async(req, res) => {
    try {
    const response = await axios.get(`${API_URL}filter?score=5&apiKey=${yourAPIKey}`);
    const result = JSON.stringify(response.data);
    console.log(result);
    res.render("index.ejs", { content: result});
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }

});

app.get("/bearerToken", async(req, res) => {
      try {
    const response = await axios.get(`${API_URL}secrets/42`, {
      headers:{
        'Authorization':  `Bearer ${yourBearerToken}`,
      },
    });
    const result = JSON.stringify(response.data);
    console.log(result);
    res.render("index.ejs", { content: result});
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
