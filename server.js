var cheerio = require("cheerio");
var axios = require("axios");

axios.get("https://news.blizzard.com/en-us/heroes-of-the-storm").then(function (response) {
  var $ = cheerio.load(response.data);

  var results = [];

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

  console.log(results);
});