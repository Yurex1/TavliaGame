import API_URL from "@/constants";
import { Socket, io } from "socket.io-client";

class SocketApi {
    static socket: null| Socket = null;

    static initSocket() {
        this.socket = io(API_URL);

        this.socket.on("connect", () => {
            console.log("Connected to socket");
        });

        this.socket.on("disconnect", (e) => {
            console.log("Disconnected from socket");
        });
    }
}

export default SocketApi;