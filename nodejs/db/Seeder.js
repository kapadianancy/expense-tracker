const User = require("../models/User");
const Tag = require("../models/ExpenseTag");
const Type = require("../models/TransactionType");
const Account = require("../models/Account-Wallet");
const Transaction = require("../models/Transaction");
const { ExpenseTags, TransactionTypes } = require("../constants");

const mySeeder = async () => {
  const users = await User.find();
  let userId = null;
  if (users.length == 0) {
    const user = new User({
      username: "nancy",
      password: "nancy123",
      phoneNumber: "9089098978",
      email: "testing@gmail.com",
    });
    const result = await user.save();
    userId = result._id;
  }

  const tags = await Tag.find();
  if (tags.length == 0) {
    const tag1 = new Tag({
      tag: ExpenseTags.GroceryFood,
    });
    const tag2 = new Tag({
      tag: ExpenseTags.Rent,
    });
    const tag3 = new Tag({
      tag: ExpenseTags.Tax,
    });
    const tag4 = new Tag({
      tag: ExpenseTags.Entertainment,
    });
    const tag5 = new Tag({
      tag: ExpenseTags.Utility,
    });
    await tag1.save();
    await tag2.save();
    await tag3.save();
    await tag4.save();
    await tag5.save();
  }

  const types = await Type.find();
  if (types.length == 0) {
    const type1 = new Type({
      type: TransactionTypes.Expense,
    });
    const type2 = new Type({
      type: TransactionTypes.Transfer,
    });
    const type3 = new Type({
      type: TransactionTypes.Income,
    });

    await type1.save();
    await type2.save();
    await type3.save();
  }

  const accounts = await Account.find();
  if (accounts.length == 0) {
    const acc = new Account({
      userId: userId,
      name: "Nancy's Wallet",
      balance: 1000,
    });
    await acc.save();
  }
};

module.exports = mySeeder;
