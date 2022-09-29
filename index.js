// index.js
// where your node app starts
require("dotenv").config();
// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api", (req, res) => {
  const date = new Date();
  return res.json({
    unix: date.getTime(),
    utc: date.toGMTString(),
  });
});

app.get("/api/:date", (req, res) => {
  //If the parameter is empty send the unix millisecond timestamp at that current time
  if (!req.params.date) {
    return res.json({
      unix: date.getTime(),
      utc: date.toGMTString,
    });
  }
  //If the date is solely a number it is a unix timestamp so execute the below logic
  if (+req.params.date) {
    const date = new Date(Number(req.params.date));
    return res.json({
      unix: date.getTime(),
      utc: date.toGMTString(),
    });
  }
  //If the date is not solely a number it could be a real date hence try to make a date object out of it and check then if the date is valid and if not return an error else return the unix millisecond timestamp and gmt string
  const date = new Date(req.params.date);
  if (date.toString() == "Invalid Date") {
    return res.json({
      error: "Invalid date",
    });
  }
  return res.json({
    unix: date.getTime(),
    utc: date.toGMTString(),
  });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
