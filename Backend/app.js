global.config = require(process.env.NODE_ENV === "production" ? "./config-prod.json" : "./config-dev.json");
const express = require("express");
const cors = require("cors");
const path = require("path");
const socketHelper = require("./helpers/socket-helper");
const chatsController = require("./controller-layer/chats-controller");

const server = express();
server.use(cors());
server.use(express.json());

server.use("/api/chats", chatsController);

//server.use(express.static(path.join(__dirname, "./frontend")));

server.use("*", (request, response) => {
    if (process.env.NODE_ENV === "production") {
        response.sendFile(path.join(__dirname, "./frontend/index.html"));
    }
    else {
        response.status(404).send("Route not found");
    }
});

const port = process.env.PORT || 3001;
const expressListener = server.listen(port, () => console.log("Listening......"));
socketHelper.init(expressListener);