require("../data-access-layer/dal");
const ChatModel = require("../models/chat-model");
const ReplayChatModel = require("../models/replay-chat-model");
const questionLogic = require("./question-logic-layer");
const socketHelper = require("../helpers/socket-helper");
const helpers = require("../helpers/helpers");

function getAllChatsAsync() {
    return ChatModel.find().exec();
}

async function addChatAsync(chat) {
    const chatAdded = await saveChatAsync(chat);
    socketHelper.chatAdded(chatAdded);
    chatService(chatAdded);
    return chatAdded;
}

async function addReplayChatAsync(replayChat) {
    const replayChatAdded = await saveChatAsync(replayChat);
    socketHelper.chatAdded(replayChatAdded);
    replayChatService(replayChatAdded);
    return replayChatAdded;
}

function saveChatAsync(chat) {
    chat.createdDate = helpers.getDateTimeNow();
    return chat.save();
}

async function replayChatService(chat) {
    if (helpers.isNotFromTheBot(chat.username) && helpers.isQuestion(chat.replayedMessage)) {
        const questionExist = await questionLogic.getQuestionAsync(chat.message);
        if (!questionExist) {
            await questionLogic.addQuestionAsync(chat.replayedMessage, chat.message);
        }
    }
}

async function chatService(chat) {
    if (helpers.isQuestion(chat.message)) {
        const questionExist = await questionLogic.getQuestionAsync(chat.message);
        if (questionExist) {
            addReplayChatAsync(getNewReplayChat(config.bot.name, config.bot.avatar, questionExist.answer, chat.message));
        }
    }
}

function getNewReplayChat(username, avatar, message, replayedMessage) {
    return new ReplayChatModel({ username, avatar, message, replayedMessage })
}

module.exports = {
    getAllChatsAsync,
    addChatAsync,
    addReplayChatAsync,
}