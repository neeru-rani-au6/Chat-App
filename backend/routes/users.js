var express = require('express');
const upload = require("../services/upload");
var { validateToken } = require('../middleware/authentication');
var router = express.Router();

var { userRegister, userLogin, userLogout, getallUser, getoneUser, updateUser, forgotPassword, Changepassword ,searchUser,findFriends} = require("../controllers/user");
/* GET users listing. */




// /api/register
router.post("/register", upload.single("photoURL"), userRegister);


router.post('/login', userLogin);
router.delete("/logout", userLogout);
router.get('/alluser', validateToken, getallUser);
router.get("/friend", validateToken, findFriends)
router.post("/forgotpassword", forgotPassword);
router.post('/Changepassword', Changepassword);
router.post("/search",searchUser)
router.get('/:id', validateToken, getoneUser);
router.put('/:id', validateToken, updateUser)
module.exports = router;
