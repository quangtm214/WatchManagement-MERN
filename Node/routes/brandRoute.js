var express = require("express");
const brandController = require("../controller/brandController");
const authController = require("../controller/authController");

var brandRoute = express.Router();
brandRoute
  .route("/")
  .get(
    authController.protect,
    authController.restricAdmin,
    brandController.getBrand
  )
  .post(
    authController.protect,
    authController.restricAdmin,
    brandController.createBrand
  );

brandRoute
  .route("/edit/:brandId")
  .put(
    authController.protect,
    authController.restricAdmin,
    brandController.updateBrand
  );
brandRoute
  .route("/delete/:brandId")
  .delete(
    authController.protect,
    authController.restricAdmin,
    brandController.deleteBrand
  );

module.exports = brandRoute;
