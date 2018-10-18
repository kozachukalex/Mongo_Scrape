var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  link: {
    type: String,
    required: true
  },
  cateogry: {
    type: String,
    required: true
  },
  title : {
      type: String,
      required: true
  },
  description : {
      type: String,
      required: true
  }
});

// This creates our model from the above schema, using mongoose's model method
var Article = mongoose.model("Article", ArticleSchema);

// Export the Article model
module.exports = Article;