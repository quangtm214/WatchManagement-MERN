var express = require("express");
const AccessController = require("../controller/accesss.controller");
var accessrouter = express.Router();

/* GET home page. */
accessrouter.route("/signup").post(AccessController.signUp);

module.exports = accessrouter;
