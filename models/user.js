const mongoose = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            default: "",
            trim: true,
            required: "Username is required"
        },
        password: { 
            type: String, 
            required: true 
        },
        email: {
            type: String,
            default: "",
            trim: true,
            required: "Email is required"
        },
        displayName: {
            type: String,
            default: "",
            trim: true,
            required: "Display name is required"
        }
    }, {
        collection: "users"
    }
)

userSchema.plugin(passportLocalMongoose, {
    missingPasswordError: "Wrong/ Missing Password"
})

module.exports = mongoose.model('User', userSchema);