var express = require('express');
var router = express.Router();
var {UploadImage} = require("../controllers/uploadImage");
router.post("/api/chat/uploadfiles",UploadImage)
module.exports = router;
