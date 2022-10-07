var express = require("express");
var router = express.Router();

require("../models/connection");
const User = require("../models/users");
const Tweet = require("../models/tweets");
const { checkBody } = require("../modules/checkBody");

// POST: addtweet
// -res.json: true, token: data.token
//User.findOne
router.post("/", (req, res) => {
  if (!checkBody(req.body, ["username"])) {
    res.json({ result: false, error: "Missing username" });
    return;
  }

  User.findOne({ username: req.body.username }).then((data) => {
    if (data) {
      const date = new Date();

      const newTweet = new Tweet({
        firstname: req.body.username,
        username: req.body.username,
        message: req.body.message,
        date: date,
        hashtag: req.body.hashtag,
      });

      newTweet.save().then(() => {
        res.json({ result: true, token: data.token });
        return;
      });
    }
  });
});

// DELETE: deletetweet
router.delete("/", (req, res) => {
  // if (!checkBody(req.body, ["username"])) {
  //     res.json({ result: true, error: "User not logged in." });
  //     return;
  //   }
  User.deleteOne({ message: req.body.message }).then((deletedDoc) => {
    if (deletedDoc) {
      res.json({ result: true });
    }
  });
});

module.exports = router;
