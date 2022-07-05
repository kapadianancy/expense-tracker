var express = require("express");
var router = express.Router();
var TransactionType = require("../models/TransactionType");
var ExpenseTag = require("../models/ExpenseTag");

router.get("/transactionTypes", async (req, res) => {
  try {
    const data = await TransactionType.find();
    res.status(200).send(data);
  } catch (e) {
    console.log(e);
  }
});

router.get("/expenseTags", async (req, res) => {
  try {
    const data = await ExpenseTag.find();
    res.status(200).send(data);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
