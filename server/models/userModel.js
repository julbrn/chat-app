const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 3,
        max: 20,
        unique: true
    },
    email: {
        type: String,
        required: true,
        min: 4,
        max: 40,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 5,
        max: 30,
        select: false
    },
    isAvatarSet: {
        type: Boolean,
        default: false,
    },
    avatar: {
        type: String,
        default: ""
    }
});

module.exports = mongoose.model("User", userSchema)