var Request = require('../models/request');
var { createToken } = require('../middleware/authentication');
const request = require('../models/request');
const User = require("../models/user");

module.exports = {
    async sendRequest(req, res) {
        try {
            console.log(req.body);
            const data = await Request.findOne({ sender: req.body.sender, receiver: req.body.receiver })
            if (data !== null) {
                return res.status(400).json({ error: "request already sent" })
            }

            await Request.create({ ...req.body });
            return res.json({ message: 'request sent successfully' });

        } catch (error) {
            console.log(error)
            return res.status(400).json({ error: 'failed to send request' })
        }
    },
    async getAllRequest(req, res) {
        try {
            var result = await request.find({ receiver: req.user.id, isAccepted: false, isReject: false }, { sender: 1 }).populate('sender', ['firstName', 'lastName', 'photoURL']).exec();
            res.json(result)
        } catch (error) {
            console.log(error)
            res.status(400).send(error)
        }
    },
    async updateRequest(req, res) {
        //console.log(req.body)
        try {
            await Request.updateOne({ _id: req.body.id }, { ...req.body })
            if (req.body.isAccepted === true) {
                console.log(req.user.id, req.body.friend);
                const data = await Promise.all([
                    User.updateOne({ _id: req.user.id }, { $addToSet: { friends: req.body.friend } }),
                    User.updateOne({ _id: req.body.friend }, { $addToSet: { friends: req.user.id } }),
                ]);
            }
            return res.json({ message: "update success" })
        } catch (error) {
            console.log(error)
            res.status(400).json({ error: "failed to updated request" })
        }
    },
    async findFriends(req, res) {
        try {
            var result = await User.findOne({ _id: req.user.id }, { friends: 1,_id:0 }).populate("friends",['firstName','lastName','photoURL','email']).exec();
            //console.log(result)
            res.json(result)
        } catch (error) {
            console.log(error)
            res.status(400).json({ error: "Not able to find friend" })

        }
    }
}