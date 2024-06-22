var createError = require("http-errors");
var express = require("express");
var app = express();
var cors = require("cors");
var path = require("path");
var cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const flash = require("connect-flash");
require("./passport")(passport);

const jwt = require("jsonwebtoken");
const memberSerrvice = require("./service/memberService");
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

app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", indexRouter);
// app.use("/member", usersRouter);
app.use("/auth", authRoute);
app.use("/brands", brandRoute);
app.use("/watchs", watchRoute);
app.use("/member", memberRoute);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || "An unexpected error occurred",
  });
});

module.exports = app;
