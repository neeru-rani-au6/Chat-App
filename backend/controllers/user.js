var User = require("../models/user");
var bcrypt = require('bcrypt');
var { createToken } = require('../middleware/authentication');
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
            var result = await User.find();
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
            var result = await User.updateOne({ ...req.body }, { _id: req.params.id })
            res.json(result)
        } catch (error) {
            console.log(error)
            res.status(400).send(error)
        }
    }
}