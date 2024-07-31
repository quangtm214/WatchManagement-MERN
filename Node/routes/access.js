var express = require("express");
const AccessController = require("../controller/accesss.controller");
const { apiKey, permission, asyncHandel } = require("../auth/checkAuth");
var accessrouter = express.Router();

/* GET home page. */

accessrouter.use(apiKey);
accessrouter.use(permission("0000"));
accessrouter.route("/signup").post(asyncHandel(AccessController.signUp));

module.exports = accessrouter;
