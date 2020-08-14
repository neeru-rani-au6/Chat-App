let mongoose = require("mongoose");
let Schema = mongoose.Schema;

var Chat = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "user",
            required: true
        },
        friend: {
            type: Schema.Types.ObjectId,
            ref: "user",
            required: true
        },
        conversation: [
            {
                name: {
                    type: String,
                },
                message: {
                    type: String,
                    trim: true
                },
                time: {
                    type: String,
                    trim: true
                },
                date: {
                    type: String,
                    trim: true
                }
            }
        ],
    }
);

let Chat = mongoose.model("chat", Chat);

module.exports = Chat;