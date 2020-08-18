//var Group = require("../models/group");
var singleChat=require("../models/single");
var Chat = require("../models/chat");
module.exports = async (server) => {
    try {
        var io = require('socket.io').listen(server);
        io.on('connection', (socket) => {
            console.log(socket.id)
            socket.on('join', (groupId) => {
                socket.join(groupId);
            });
            socket.on('message',async (data)=>{
                var newMessage = await new Chat(data).save();
                io.to(data.groupId).emit('message',newMessage);
            })
            socket.on('SingleMessage',async (data)=>{
                console.log("online17",data)
                var newMessage = await new singleChat(data).find();
                console.log("newmessage",newMessage)
                 emit('SingleMessage',newMessage);
            })
            socket.on('get-chat-history', (userId) => {
                Chat.findChats(userId, (err, docs) => {
                    socket.emit('set-chat-history', docs);
                });
            });
        })
    } catch (error) {
        console.log('socket error',error);
    }
}

/*
io.on("connection", socket => {
  console.log("socketId",socket.id);
  console.log("MSG")
  socket.on("Input Chat Message", msg => {
  console.log('messagesss: ' + msg);
  connect.then(db => {
    try {
      console.log("inside connection")
      console.log("MSG ",msg.chatMessage)
      console.log(msg.userId)
      console.log(msg.type )
       let chat = new singleChat({ message: msg.chatMessage, sender:msg.userId, type: msg.type })
        console.log(chat)
        chat.save((err, doc) => {
          console.log(doc._id)
          if(err) return console.log(err)
          console.log("no err")
          Chat.find({ "_id": doc._id })
          .populate("sender")
          .exec((err, doc)=> {
              
              console.log(doc)   
              return io.emit("Output Chat Message", doc);
          })
        })
    } catch (error) {
      console.error(error);
    }
  })
 })

})

*/