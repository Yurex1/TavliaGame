"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// SimulateWebSocketClient.ts
var socket_io_client_1 = require("socket.io-client");
var socket = (0, socket_io_client_1.io)("http://localhost:3000");
socket.on("connect", function () {
    console.log("Connected to WebSocket server");
    // Join a room after connecting
    socket.emit("joinRoom", { roomName: "room1" });
});
// Handle any other events you need here
