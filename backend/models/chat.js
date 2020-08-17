let mongoose = require("mongoose");
let Schema = mongoose.Schema;

var chat = new Schema(
    {
        sender: {
            type: Schema.Types.ObjectId,
            ref: "user"
        },
        receiver: {
            type: Schema.Types.ObjectId,
            ref: "user"
        },
        groupId: {
            type: Schema.Types.ObjectId,
            ref: "group"
        },
        message: {
            type: String,
            trim: true
        },
        name:String,
        photoURL:String
    },{
        timestamps:true
    }
);

 var Chat = mongoose.model("chat", chat);

module.exports = Chat;