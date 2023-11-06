"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const io = require("socket.io-client");
const socket = io.connect("http://localhost:3000");
socket.on("connect", () => {
    console.log("Connected to the WebSocket server");
    socket.emit("room1", { roomName: "room1" });
});
//# sourceMappingURL=SimulateWebSocketClient.js.map