import API_URL from "@/constants";
import { Socket, io } from "socket.io-client";

class SocketApi {
    static socket: null| Socket = null;

    static initSocket() {
        this.socket = io(API_URL + "events", {extraHeaders: {Authorization: `Bearer ${localStorage.getItem("token")}`}});

        this.socket.on("connect", () => {
            console.log("Connected to socket");
        });

        this.socket.on("disconnect", () => {
            console.log("Disconnected from socket");
        });
    }
}

export default SocketApi;