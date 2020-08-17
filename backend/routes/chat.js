var express = require('express');
var { validateToken } = require('../middleware/authentication');
var router = express.Router();
var { findMessage } = require("../controllers/chat");

router.get("/:groupId", validateToken, findMessage)

module.exports = router;