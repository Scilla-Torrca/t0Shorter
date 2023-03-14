const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        min: 3,
    },
    password: {
        type: String,
        required: true,
    },
    isCheckEmail: {
        type: Boolean,
        required: true,
        default: false
    }
});

module.exports = mongoose.model("user",userSchema);