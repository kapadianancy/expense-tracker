var express = require("express");
var router = express.Router();
var Account = require("../models/Account-Wallet");

router.post("/add", async (req, res) => {
  try {
    if (Object.keys(req.body).length == 0) {
      res.status(400).send({ error: "Bad Request" });
    }
    const account = new Account({ ...req.body });
    const result = await account.save((err, data) => {
      if (!err) {
        res.status(201).send({ message: "Account added." });
      } else {
        res.status(400).send({ error: "Something went wrong" });
      }
    });
  } catch (e) {
    console.log(e);
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const id = req.params.userId;
    var query = { userId: id };
    if (req.query.active) {
      if (req.query.active == "true") {
        query = {
          ...query,
          isDeleted: false,
        };
      } else {
        query = {
          ...query,
          isDeleted: true,
        };
      }
    }

    var accounts = await Account.find(query).populate("userId");
    if (accounts.length == 0) {
      res.status(400).send({ error: "No Accounts Found." });
    } else {
      res.status(200).send({ total: accounts.length, accounts });
    }
  } catch (e) {
    console.log(e);
  }
});

router.patch("/edit/:id", async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(400).send({ error: "Bad Request." });
    } else {
      const account = await Account.findByIdAndUpdate(id, { ...req.body });
      if (account) {
        res.status(200).send({ message: "Account updated." });
      } else {
        res.status(400).send({ error: "Account not found." });
      }
    }
  } catch (e) {
    console.log(e);
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    var id = req.params.id;
    if (!id) {
      res.status(400).send({ error: "Bad Request." });
    } else {
      const account = await Account.findByIdAndUpdate(id, { isDeleted: true });
      if (account) {
        res.status(200).send({ message: "Account Deactivated." });
      } else {
        res.status(400).send({ error: "Account not found." });
      }
    }
  } catch (e) {
    console.log(e);
  }
});

router.get("/total-income/:userId", async (req, res) => {
  try {
    const id = req.params.userId;
    let result = await Account.aggregate([
      {
        $group: {
          _id: "$userId",
          total: { $sum: "$balance" },
        },
      },
    ]);

    result = result.filter((r) => {
      if (r._id == id) {
        return r;
      }
    });
    if (result.length == 0) {
      result = [
        {
          _id: id,
          total: 0,
        },
      ];
    }

    res.status(200).send(result[0]);
  } catch (e) {
    console.log(e);
  }
});

router.get("/total-acc/:userId", async (req, res) => {
  try {
    const id = req.params.userId;

    let result = await Account.aggregate([
      {
        $group: {
          _id: "$userId",
          count: { $sum: 1 },
        },
      },
    ]);
    result = result.filter((r) => {
      if (r._id == id) {
        return r;
      }
    });
    //no data for that id
    if (result.length == 0) {
      result = [
        {
          _id: id,
          count: 0,
        },
      ];
    }
    res.status(200).send(result[0]);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
