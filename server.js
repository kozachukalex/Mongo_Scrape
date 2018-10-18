var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

var axios = require("axios");
var cheerio = require("cheerio");

var db = require("./models");

var PORT = 3000;

// Initialize Express
var app = express();

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

//Connect to mongo db homeworkScrape
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI);


console.log("Scraping...");
app.get("/scrape", function (req, res) {

  var results = [];

  axios.get("https://news.blizzard.com/en-us/heroes-of-the-storm").then(function (response) {
    var $ = cheerio.load(response.data);

    $(".ArticleListItem").each(function (i, element) {
      var link = $(element).children().attr("href");
      var category = $(element).children().children().children().children(".ArticleListItem-label").text()
      var title = $(element).children().children().children(".ArticleListItem-title").text()
      var description = $(element).children().children().children(".ArticleListItem-description").text()
      results.push({
        link: link,
        category: category,
        title: title,
        description: description
      });
    });
    res.json(results);
  });


});

app.listen(PORT, function () {
  console.log("App running on port " + PORT + "!");
});