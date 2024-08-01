var express = require("express");
const AccessController = require("../controller/accesss.controller");
const { apiKey, permission } = require("../auth/checkAuth");
const asyncHandler = require("../helpers/asyncHandler");
const { authentication } = require("../auth/auth.Utils");
var accessrouter = express.Router();

/* GET home page. */

// accessrouter.use(apiKey);
// accessrouter.use(permission("0000"));
accessrouter.route("/signup").post(asyncHandler(AccessController.signUp));
accessrouter.route("/login").post(asyncHandler(AccessController.login));

//authenticaion//
accessrouter.use(authentication);
///////////////////////
accessrouter.route("/logout").post(asyncHandler(AccessController.logout));

module.exports = accessrouter;
