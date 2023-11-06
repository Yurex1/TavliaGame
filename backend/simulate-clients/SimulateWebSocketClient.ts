// SimulateWebSocketClient.ts
import * as io from "socket.io-client";

const socket = io.connect("http://localhost:3000");

socket.on("connect", () => {
  console.log("Connected to the WebSocket server");

  // Perform WebSocket actions after the connection is established
  socket.emit("room1", { roomName: "room1" });
});

// Handle any other events you need here
