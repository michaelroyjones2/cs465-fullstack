var express = require("express");
var router = express.Router();
const ctrlMain = require("../controllers/main");
/* GET home page. */
router.get("/", ctrlMain.index); //There was a bunch of stuff here that was unneeded.

module.exports = router;
