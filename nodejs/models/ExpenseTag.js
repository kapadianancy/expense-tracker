const mongoose = require("mongoose");

const TagsSchema = mongoose.Schema(
  {
    tag: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);
TagsSchema.virtual("Transaction", {
  ref: "Transaction",
  localField: "_id",
  foreignField: "expenseTagId",
});

const ExpenseTag = mongoose.model("ExpenseTag", TagsSchema);

module.exports = ExpenseTag;
