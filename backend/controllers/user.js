var User = require("../models/user");
var bcrypt = require('bcrypt');
var { createToken } = require('../middleware/authentication');
var sendMail = require('../services/email');
const { search } = require("../routes");
module.exports = {
    async userRegister(req, res) {
        try {
            req.body.password = await bcrypt.hash(req.body.password, 10);
            await User.create({ ...req.body });
            return res.json({ success: true, message: 'user register successfully' })
        } catch (error) {
            console.log(error)
            if (error.name === "MongoError") {
                return res.status(400).json({ message: error.message });
            }
            res.status(400).send(error);
        }
    },
    async userLogin(req, res) {
        try {
            const email = req.body.email;
            const password = req.body.password;
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ error: "User does not exists" })
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(404).json({ error: "Invalid Password" });
            }
            var token = await createToken(user);
            res.cookie('token', token);
            return res.json({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                id: user._id,
                photoURL: user.photoURL,
                token: token
            });
        } catch (error) {
            console.log(error)
            if (error.name === "MongoError") {
                return res.status(400).send(`Validation Error: ${error.message}`)
            }
            res.status(400).send(error);

        }
    },
    async userLogout(req, res) {
        try {
            res.cookie('token', { expires: Date.now() });
            return res.json({ message: "logged out" })
        } catch (error) {
            console.log(error)
            res.status(400).send(error)

        }
    },
    async getallUser(req, res) {
        try {
            var result = await User.find({ _id: { $ne: req.user.id } });
            res.json(result)
        } catch (error) {
            console.log(error)
            res.status(400).send(error)

        }
    },
    async getoneUser(req, res) {
        try {
            var result = await User.find({ _id: req.params.id })
            res.json(result);
        } catch (error) {
            console.log(error)
            res.status(400).send(error)

        }
    },
    async updateUser(req, res) {
        try {
            var result = await User.updateOne({ _id: req.params.id }, { ...req.body })
            res.json(result)
        } catch (error) {
            console.log(error)
            res.status(400).send(error)
        }
    },
    async forgotPassword(req, res) {
        try {
            var email = req.body.email;
            var token = Math.floor((Math.random() * 1000000) + 1);
            var user = await User.findOne({ email })
            if (user) {
                await sendMail({
                    to: email,
                    subject: 'Forgot Password',
                    body: `<h4>Hi ${user.firstName}</h4>
                            <p>You have requested for forgot password, your otp is ${token} to reset password <p>
                            <br /> <br />
                            <p>regards <br /> Chat App Team</p>`
                });
                await User.updateOne({ _id: user._id }, { resetToken: token });

                res.json({ "message": "otp is sent successfully" });

            } else {
                res.status(400).json({ "error": "email not found" })
            }
        } catch (error) {

            console.log(error)
        }
    },
    async Changepassword(req, res) {
        try {
            const resetToken = req.body.resetToken;
            const email = req.body.email;
            const newPassword = req.body.password
            console.log(req.body);

            console.log(resetToken)
            const user = await User.findOne({ email });
            console.log(user.resetToken)
            console.log(user)
            if (resetToken !== user.resetToken) {
                return res.status(404).json({ error: "INVALID OTP, check your email again" });
            }
            const passwordnew = await bcrypt.hash(newPassword, 10)
            console.log(passwordnew)
            await User.updateOne({ _id: user._id }, { password: passwordnew });
            return res.status(200).json({ message: "You have successfully changed your password" })
        } catch (error) {
            console.log(error)

        }
    },
    async searchUser(req, res) {
        try {
            console.log(req.body)
            var result = await User.find({$or:[{firstName: { "$regex": req.body.searchQuery, "$options": "i" }},{lastName: { "$regex": req.body.searchQuery, "$options": "i" }}] }, { firstName: 1, lastName: 1 });
            return res.json(result);
        } catch (error) {
           // console.log(error)
            return res.status(400).json(error);
        }
    },
    async findFriends(req, res) {
        try {
           if(req.user.id){
               var result = await User.findOne({ _id: req.user.id }, { friends: 1, _id: 0 }).populate("friends").exec();
               console.log(result)
               return res.json(result)
           }else{
            res.status(400).json({ error: "Not a valid token" })
           }
        } catch (error) {
            console.log(error)
            res.status(400).json({ error: "Not able to find friend" })

        }
    }
}