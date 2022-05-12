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

const ExpenseTag = mongoose.model("ExpenseTag", TagsSchema);

module.exports = ExpenseTag;
