const mongoose = require("mongoose");
const url = process.env.MONGO || "mongodb://localhost:27017/ExpenseTracker";
mongoose.connect(
  url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (!err) {
      console.log("mongodb connected");
    } else {
      console.log(err);
    }
  }
);
