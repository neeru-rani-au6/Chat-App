let mongoose = require("mongoose");
let Schema = mongoose.Schema;

var Request = new Schema(
    {
        sender:
        {
            type: Schema.Types.ObjectId,
            ref: "user",
            unique: true
        },
        receiver:
        {
            type: Schema.Types.ObjectId,
            ref: "user",
            unique: true
        },
        isAccepted: {
            type: Boolean,
            default: false
        },
        isReject: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

var Request = mongoose.model("Request", Request);

module.exports = Request;