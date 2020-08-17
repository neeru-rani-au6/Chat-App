//var Group = require("../models/group");
var Chat = require("../models/chat");
module.exports = async (server) => {
    try {
        var io = require('socket.io').listen(server);
        io.on('connection', (socket) => {
            socket.on('join', (groupId) => {
                socket.join(groupId);
            });
            socket.on('message',async (data)=>{
                var newMessage = await new Chat(data).save();
                io.to(data.groupId).emit('message',newMessage);
            })
        })
    } catch (error) {
        console.log('socket error',error);
    }



}