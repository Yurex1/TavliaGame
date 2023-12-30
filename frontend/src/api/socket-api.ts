import API_URL from "@/constants";
import useUser from "@/hooks/useUser";
import { Move } from "@/models/Game";
import { Socket, io } from "socket.io-client";

class SocketApi {
  static socket: null | Socket = null; // socket
  static history: Move[] = []; // on move
  static status: string | null = null; // on start
  static message: string | null = null; 
  static moveStatus: string = "can move"; // on move and after move
  static roomId: string | null = null; // on conecting to room
  static userId: number | null = null;
  static whiteId: number | null = null; // on start or join game
  static blackId: number | null = null; // on start or join game
  static n: number | null = null; // on conect to game
  static lastmove: Move | null = null; // after move
  static moverId: number | null = null; // on start and after move

  static initSocket(n: number) {
    this.socket = io(API_URL + "events", {
      extraHeaders: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    this.socket.on("connect", () => {
        const user = useUser();
        this.n = n;
        this.userId = user.data?.data.sub;
    });

    this.socket.on("inGame", (history: Move[], n: number, roomId: string, whiteId : number, blackId : number) => {
        if(this.n != n)
        {
            this.status = "you already in game" + n + "x" + n;
            return;
        }
        this.roomId = roomId;
        this.whiteId = whiteId;
        this.blackId = blackId;
        this.status = "start game";
        this.history = history;
        this.moverId = this.whiteId;
        if(history.length % 2 == 1)
        {
            this.moverId = this.blackId;
        }
    });

    this.socket.on("move", (move: Move) => {
      if (
        !this.lastmove ||
        this.lastmove.from.x != move.from.x ||
        this.lastmove.from.y != move.from.y ||
        this.lastmove.to.x != move.to.x ||
        this.lastmove.to.y != move.to.y
      ) {
        this.lastmove = move;
        this.history.push(move);
        this.moveStatus = "can move";
        this.moverId = this.moverId === this.whiteId ? this.blackId : this.whiteId;
    }
    });

    this.socket.on("move status", (status: string) => {
      this.message = status;
      this.moveStatus = "can move";
    });

    this.socket.on("disconnect", () => {
    });
  }

  static createGame() {
    this.socket?.emit("createRoom", {
      n: this.n,
      userId: this.userId,
    });
    this.socket?.on("getRoomId", (roomId: string) => {
      this.roomId = roomId;
    });
    this.socket?.on("start game", (whiteId: null|number, blackId: null|number) => {
        this.status = "start game";
        this.whiteId = whiteId;
        this.blackId = blackId;
        this.moverId = whiteId;
    });
  }

  static joinRoom(roomId: string) {
    this.socket?.emit("joinRoom", {
      roomId: roomId,
      userId: this.userId,
      n: this.n,
    });
    this.socket?.on("start game", (whiteId: null|number, blackId: null|number) => {
        this.status = "start game";
        this.roomId = roomId;
        this.whiteId = whiteId;
        this.blackId = blackId;
        this.moverId = whiteId;
    });
  }

  static move(move: Move) {
    this.socket?.emit("move", {
      moveFrom: move.from,
      moveTo: move.to,
    });
    this.moveStatus = "wait for move";
  }

  static getGame() {
    const game = {
      history: this.history,
      status: this.status,
      n: this.n,
      roomId: this.roomId,
      whiteId: this.whiteId,
      blackId: this.blackId,
      moverId: this.moverId,
      userId: this.userId,
      moveStatus: this.moveStatus,
    };
    return game;
  }
}

export default SocketApi;
