const mongoose = require("mongoose");
const shortId = require("shortid");

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
    },
    checkEmailPoint: {
        type: String,
        required: true,
        default:shortId.generate
    }
});

module.exports = mongoose.model("user",userSchema);