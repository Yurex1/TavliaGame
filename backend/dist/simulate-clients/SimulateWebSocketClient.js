"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_client_1 = require("socket.io-client");
const socket = (0, socket_io_client_1.io)("http://localhost:3000");
socket.on("connect", () => {
    console.log("Connected to the WebSocket server");
    socket.emit("joinRoom", { roomName: "room1" });
});
//# sourceMappingURL=SimulateWebSocketClient.js.map