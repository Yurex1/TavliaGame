// SimulateWebSocketClient.ts
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

socket.on("connect", () => {
  console.log("Connected to the WebSocket server");

  // Perform WebSocket actions after the connection is established
  socket.emit("joinRoom", { roomName: "room1" });
});

// Handle any other events you need here
