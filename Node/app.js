var createError = require("http-errors");
var express = require("express");
var app = express();
var cors = require("cors");
var path = require("path");

const passport = require("passport");

require("./passport")(passport);

var logger = require("morgan");
const mongoose = require("mongoose");
const url = "mongodb://127.0.0.1:27017/WatchShop";
const connect = mongoose.connect(url);
connect.then((db) => {
  console.log("connect success");
});
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const authRoute = require("./routes/authRoute");
const brandRoute = require("./routes/brandRoute");
const watchRoute = require("./routes/watchRoute");
const authController = require("./controller/authController");
const memberRoute = require("./routes/memberRoute");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const accessrouter = require("./routes/access");

app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", indexRouter);
app.use("/accessrouter", accessrouter);
// app.use("/member", usersRouter);
app.use("/auth", authRoute);
app.use("/brands", brandRoute);
app.use("/watchs", watchRoute);
app.use("/accounts", memberRoute);
// catch 404 and forward to error handler
app.use((res, req, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  const statusCode = error.status || 500;
  return res.status(statusCode).json({
    status: "error",
    code: statusCode,
    message: error.message || "Internal Server Error",
  });
});

// app.use(function (req, res, next) {
//   next(createError(404));
// });

// error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.stack || "An unexpected error occurred",
  });
});

module.exports = app;
