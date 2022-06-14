var express = require("express");
var router = express.Router();
var Transaction = require("../models/Transaction");
var TransactionType = require("../models/TransactionType");
var Account = require("../models/Account-Wallet");
const ExpenseTag = require("../models/ExpenseTag");
const { TransactionTypes } = require("../constants");
const AccountWallet = require("../models/Account-Wallet");

router.post("/add", async (req, res) => {
  try {
    if (Object.keys(req.body).length == 0) {
      res.status(400).send({ error: "Bad Request." });
    } else {
      var transaction = new Transaction({ ...req.body });
      transaction.save(async (err, data) => {
        if (err) {
          console.log(err);
          res.status(400).send({ error: "Something went wrong." });
        } else {
          // calculate balance after new transaction added

          var transactionType = await TransactionType.findById(
            data.transactionTypeId
          );

          if (data.from) {
            var fromAccount = await Account.findById(data.from);
          }
          if (data.to) {
            var toAccount = await Account.findById(data.to);
          }

          if (transactionType.type == TransactionTypes.Expense) {
            var balance = fromAccount.balance - data.amount;
            await Account.findByIdAndUpdate(data.from, { balance });
          } else if (transactionType.type == TransactionTypes.Transfer) {
            var balance = fromAccount.balance - data.amount;
            await Account.findByIdAndUpdate(data.from, { balance });

            balance = toAccount.balance + data.amount;
            await Account.findByIdAndUpdate(data.to, { balance });
          } else if (transactionType.type == TransactionTypes.Income) {
            var balance = toAccount.balance + data.amount;
            await Account.findByIdAndUpdate(data.to, { balance });
          } else {
            res.status(400).send({ error: "Bad Request" });
          }

          res.status(201).send({ message: "Successfully added transaction." });
        }
      });
    }
  } catch (e) {
    console.log(e);
  }
});

router.get("/", async (req, res) => {
  try {
    var query = { isDeleted: false };

    //find by account/wallet
    if (req.query.account) {
      query = {
        ...query,
        $or: [{ from: req.query.account }, { to: req.query.account }],
      };
    }

    //find by transaction type
    if (req.query.type) {
      var type = await TransactionType.findOne({ type: req.query.type });

      query = {
        ...query,
        transactionTypeId: type?._id,
      };
    }

    //find by expense tag
    if (req.query.tag) {
      var tag = await ExpenseTag.findOne({ tag: req.query.tag });
      query = {
        ...query,
        expenseTagId: tag?._id,
      };
    }

    // find by less than amount
    if (req.query.lt) {
      query = {
        ...query,
        amount: { $lt: req.query.lt },
      };
    }

    //find by greater than amount
    if (req.query.gt) {
      query = {
        ...query,
        amount: { $gt: req.query.gt },
      };
    }

    var trans = await Transaction.find(query)
      .populate("transactionTypeId")
      .populate("expenseTagId")
      .populate("from")
      .populate("to");
    if (trans.length > 0) {
      res.status(200).send({ total: trans.length, transactions: trans });
    } else {
      res.status(400).send({ error: "No Transactions found." });
    }
  } catch (e) {
    console.log(e);
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    var id = req.params.id;
    const result = await Transaction.findByIdAndUpdate(id, { isDeleted: true });
    if (result) {
      res.status(200).send({ message: "Transaction Successfully deleted" });
    } else {
      res.status(400).send({ error: "Something went wrong" });
    }
  } catch (e) {
    console.log(e);
  }
});

router.patch("/edit/:id", async (req, res) => {
  try {
    if (Object.keys(req.body).length == 0) {
      res.status(400).send({ error: "Bad Request" });
    } else {
      var id = req.params.id;
      var result = await Transaction.findByIdAndUpdate(id, { ...req.body });
      if (result) {
        res.status(200).send({ message: "Transaction Successfully updated" });
      } else {
        res.status(400).send({ error: "Something went wrong" });
      }
    }
  } catch (e) {
    console.log(e);
  }
});

router.get("/total-expense", async (req, res) => {
  try {
    const type = await TransactionType.findOne({
      type: TransactionTypes.Expense,
    });

    const trans = await Transaction.find({ transactionTypeId: type._id });
    let total = 0;
    trans.forEach((t) => {
      total += t.amount;
    });

    res.status(200).send({ total });
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
