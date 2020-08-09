var express = require('express');
var { validateToken } = require('../middleware/authentication');
var router = express.Router();
var { userRegister, userLogin, userLogout, getallUser, getoneUser, updateUser } = require("../controllers/user");
/* GET users listing. */
router.post('/register', userRegister);
router.post('/login', userLogin);
router.delete("/logout", userLogout);
router.get('/alluser', validateToken, getallUser);
router.get('/:id', validateToken, getoneUser);
router.put('/:id', validateToken, updateUser)
module.exports = router;
