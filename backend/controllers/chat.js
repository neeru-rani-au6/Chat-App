var Chat = require('../models/chat');
var { createToken } = require('../middleware/authentication');

module.exports = {
    async findMessage(req, res) {
        try {
            const data = await Chat.find({ groupId: req.params.groupId })
            return res.json(data)

        } catch (error) {
            console.log(error)

        }
    }
}