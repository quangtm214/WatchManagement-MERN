var express = require("express");
const homeController = require("../controller/homeController");
const watchController = require("../controller/watchController");
var router = express.Router();

/* GET home page. */
router.route("/").get(watchController.getWatchInHome);

module.exports = router;
