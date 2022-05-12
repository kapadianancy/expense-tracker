const mongoose = require("mongoose");

const AccountSchema = mongoose.Schema(
  {
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

const AccountWallet = mongoose.model("Account-Wallet", AccountSchema);

module.exports = AccountWallet;
