const express = require("express");
const ChatModel = require("../models/chat-model");
const ReplayChatModel = require("../models/replay-chat-model");
const chatsLogic = require("../business-logic-layer/chats-logic-layer");
const errorHelper = require("../helpers/errors-helper");

const router = express.Router();

router.post("/get-all-chats", async (request, response) => {
    try {
        const chats = await chatsLogic.getAllChatsAsync();
        response.json(chats);
    }
    catch (err) {
        response.status(500).send(errorHelper.getError(err));
    }
});

router.post("/add-chat", async (request, response) => {
    try {
        const chat = new ChatModel(request.body);
        const error = chat.validateSync();
        if (error) return response.status(400).send(errorHelper.getError(error));
        const chatAdded = await chatsLogic.addChatAsync(chat);
        response.status(201).json(chatAdded);
    }
    catch (err) {
        response.status(500).send(errorHelper.getError(err));
    }
});

router.post("/add-replayed-chat", async (request, response) => {
    try {
        const replayedChat = new ReplayChatModel(request.body);
        const error = replayedChat.validateSync();
        if (error) return response.status(400).send(errorHelper.getError(error));
        const replayChatAdded = await chatsLogic.addReplayChatAsync(replayedChat);
        response.status(201).json(replayChatAdded);
    }
    catch (err) {
        response.status(500).send(errorHelper.getError(err));
    }
});

module.exports = router;