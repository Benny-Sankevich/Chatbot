const mongoose = require("mongoose");

const ChatSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Missing username."],
        minLength: [3, "Username name must be minimum 3 chars."],
        maxLength: [20, "Username name can`t exceed 20 chars."],
        match: [/^[A-Zא-ת].*$/, "Username  must start with a capital letter."]
    },
    avatar: {
        type: String,
        required: [true, "Missing avatar."],
        minLength: [1, "Avatar must be minimum 1 chars."],
        maxLength: [2, "Avatar can`t exceed 2 chars."],
    },
    message: {
        type: String,
        required: [true, "Missing message."],
        minLength: [1, "Message must be minimum 1 chars."],
        maxLength: [5000, "Message can`t exceed 5000 chars."],
    },
    replayedMessage: {
        type: String,
        minLength: [1, "Replayed message must be minimum 1 chars."],
        maxLength: [5000, "Replayed message can`t exceed 5000 chars."],
    },
    createdDate: {
        type: String,
    },
    isReplay: {
        type: Boolean,
        default: false,
    }
},
    {
        versionKey: false,
        id: false
    });

const ChatModel = mongoose.model("ChatModel", ChatSchema, "chats");

module.exports = ChatModel;