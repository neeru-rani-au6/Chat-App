var Chat = require('../models/chat');
var { createToken } = require('../middleware/authentication');

module.exports = {
    async sendMessage(req, res) {
        try {
            let currentUser = req.user;
            let friendId = req.params.sendTo;
            let message = req.body.message;
            let formatOfMessage = formatMessage(currentUser._id, message, currentUser.name)
            let userConversation = await Chat.findOne({ $and: [{ user: currentUser._id }, { friend: friendId }] }).populate({ path: "conversation", populate: { path: "user" } });
            let friendConversation = await Chat.findOne({ $and: [{ user: friendId }, { friend: currentUser._id }] });

        } catch (error) {
            console.log(error)

        }
    }
}