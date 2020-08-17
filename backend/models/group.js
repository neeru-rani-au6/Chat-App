let mongoose = require("mongoose");
let Schema = mongoose.Schema;

var group = new Schema({
    groupName: {
        type: String,
        lowercase: true,
        trim: true,
        required: [true]
    },
    photoURL: String,
    owner:
    {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    member: [
        {
            type: Schema.Types.ObjectId,
            ref: "user",
        }
    ]
}, { timestamps: true });

let Group = mongoose.model("group", group);

module.exports = Group;