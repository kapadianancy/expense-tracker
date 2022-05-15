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

TransactionTypeSchema.virtual("Transaction", {
  ref: "Transaction",
  localField: "_id",
  foreignField: "transactionTypeId",
});

const TransactionType = mongoose.model(
  "TransactionType",
  TransactionTypeSchema
);

module.exports = TransactionType;
