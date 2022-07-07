const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    phoneNumber: {
      type: String,
      required: true,
      length: 10,
    },
    email: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

UserSchema.virtual("Transaction", {
  ref: "Transaction",
  localField: "_id",
  foreignField: "userId",
});

UserSchema.virtual("Account-Wallet", {
  ref: "Account-Wallet",
  localField: "_id",
  foreignField: "userId",
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
