var express = require("express");
var router = express.Router();
var User = require("../models/User");
var bcrypt = require("bcryptjs");

router.post("/signup", async (req, res) => {
  if (Object.keys(req.body).length == 0) {
    res.status(400).send({ error: "Bad Request" });
  }
  try {
    const user = new User({ ...req.body });
    user.save((err, data) => {
      if (!err) {
        res
          .status(201)
          .send({ message: "Successfully signed in.", user: data._id });
      } else {
        res.status(400).send({ error: "Something went wrong." });
      }
    });
  } catch (e) {
    console.log(e);
  }
});

router.post("/login", async (req, res) => {
  try {
    if (Object.keys(req.body).length == 0) {
      res.status(400).send({ error: "Bad Request." });
    }
    let user = await User.findOne({
      username: req.body.username,
    });
    if (user) {
      let result = await bcrypt.compare(req.body.password, user.password);
      if (result) {
        res
          .status(200)
          .send({ message: "Successfully logged in.", user: user._id });
      } else {
        res.status(400).send({ error: "Unathorized" });
      }
    } else {
      res.status(400).send({ error: "Unathorized" });
    }
  } catch (e) {
    console.log(e);
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const id = req.params.userId;
    const user = await User.findById(id);
    res.status(200).send(user);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
