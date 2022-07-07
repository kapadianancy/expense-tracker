const mongoose = require("mongoose");

const TransactionSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    transactionTypeId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "TransactionType",
    },
    expenseTagId: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "ExpenseTag",
    },
    from: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Account-Wallet",
    },
    to: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Account-Wallet",
    },
    amount: {
      type: Number,
      required: true,
    },
    note: {
      type: String,
      required: false,
    },
    isDeleted: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Transaction = mongoose.model("Transaction", TransactionSchema);

module.exports = Transaction;
