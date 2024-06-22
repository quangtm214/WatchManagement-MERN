var express = require("express");
const authController = require("../controller/authController");

var authRoute = express.Router();
authRoute.route("/signup").post(authController.signup);
authRoute.route("/login").post(authController.login);
authRoute.route("/logout").get(authController.logout);
authRoute
  .route("/personal")
  .get(authController.protect, authController.personal);
authRoute
  .route("/personal/changePassword")
  .patch(authController.protect, authController.ChangePassword);
module.exports = authRoute;
