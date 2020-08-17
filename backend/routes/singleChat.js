var express = require('express');
var { validateToken } = require('../middleware/authentication');
var router = express.Router();
var { getChats,addChats} = require("../controllers/singleChat");

router.get("/getChats", validateToken, getChats)
router.post("/addChats",  addChats)
module.exports = router;