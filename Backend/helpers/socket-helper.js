const io = require("socket.io");
const helpers = require("./helpers");

let socketServer;

function init(expressListener) {
    socketServer = io(expressListener, {
        cors: { origin: "http://localhost:8080" }
    });
    socketServer.sockets.on("connection", socket => {
        console.log("Client Connected. Total clients: ", socketServer.engine.clientsCount, "name: ", socket.handshake.query.name);
        socket.on("disconnect", () => console.log("Client Disconnected. Total clients: ", socketServer.engine.clientsCount ? socketServer.engine.clientsCount - 1 : socketServer.engine.clientsCount));
    });
}

function chatAdded(msg) {
    if (helpers.isNotFromTheBot(msg.username)) {
        socketServer.sockets.emit("chat", msg);
    }
    else {
        setTimeout(() => {
            socketServer.sockets.emit("chat", msg);
        }, 2500);
    }
}

module.exports = {
    init,
    chatAdded,
};
