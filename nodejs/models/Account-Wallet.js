const mongoose = require("mongoose");

const AccountSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    balance: {
      type: Number,
      required: true,
      minlength: 6,
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
AccountSchema.virtual("Transaction", {
  ref: "Transaction",
  localField: "_id",
  foreignField: ["from", "to"],
});

const AccountWallet = mongoose.model("Account-Wallet", AccountSchema);

module.exports = AccountWallet;
