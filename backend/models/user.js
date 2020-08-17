var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = new Schema({
    firstName: {
        type: String,
        lowercase: true,
        trim: true,
        min:4,
        required: [true]
       
    },
    lastName: {
        type: String,
        lowercase: true,
        trim: true,
        min:4,
        required: [true, "lastName is required"]
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: [true, "email is required"]
    },

    password: {
        type: String,
        trim: true,
        min: 8,
        required: [true, "password is required"]
    },
    photoURL: String,
    resetToken: String,
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: "user",
        }
    ],
    group: [
        {
            type: Schema.Types.ObjectId,
            ref: "group",
        }
    ]

});

var User = mongoose.model('user', User);

module.exports = User;