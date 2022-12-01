const mongoose = require("mongoose");

const commentsSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    content: {
        type: String,
    },
    createdAt:{
        type:Date,
        default: Date.now
    }

});

module.exports = mongoose.model("Comments", commentsSchema);