const mongoose = require("mongoose");

const TransactionTypeSchema = mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const TransactionType = mongoose.model(
  "TransactionType",
  TransactionTypeSchema
);

module.exports = TransactionType;
