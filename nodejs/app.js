var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var db = require("./db/db-config");
var seeder = require("./db/Seeder");

var UserRoute = require("./routes/UserRoute");
var AccountRouter = require("./routes/AccountRoute");
var TransactionRouter = require("./routes/TransactionRoute");

var app = express();
seeder();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/user", UserRoute);
app.use("/acc", AccountRouter);
app.use("/transaction", TransactionRouter);
app.use("/*", (req, res) => {
  res.status(404).send({ error: "Url Not Found" });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
