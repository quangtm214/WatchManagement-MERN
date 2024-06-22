var express = require("express");
const memberController = require("../controller/memberController");
const authController = require("../controller/authController");
var memberRoute = express.Router();
memberRoute
  .route("/updateMemberName")
  .put(authController.protect, memberController.updateMember);
memberRoute
  .route("/getAllMember")
  .get(
    authController.protect,
    authController.restricAdmin,
    memberController.getAllMember
  );
module.exports = memberRoute;
