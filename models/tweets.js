const mongoose = require("mongoose");

const tweetSchema = mongoose.Schema({
  firstname: String,
  username: String,
  message: String,
  date: Date,
  hashtag: String,
});

const Tweet = mongoose.model("tweets", tweetSchema);

module.exports = Tweet;
