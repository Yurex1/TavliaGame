import API_URL from "@/constants";
import { useConnectType } from "@/hooks/useConnect";
import { Square } from "@/models/Square";
import { Move } from "@/types/types";
import { Socket, io } from "socket.io-client";

class SocketApi {
  static socket: null | Socket = null;
  static history: Move[] = [];
  static setHistory: (history: Move[]) => void = () => {};
  static setPageStatus: (pageStatus: string | null) => void = () => {};
  static moveMessage: string | null = null;
  static moveStatus: string = "can move";
  static setMoveStatus: (moveStatus: string) => void = () => {};
  static roomId: string | null = null; // on conecting to room
  static userId: number | null = null;
  static whiteId: number | null = null; // on start or join game
  static blackId: number | null = null; // on start or join game
  static n: number | null = null; // on conect to game
  static lastmove: Move | null = null; // after move
  static setMoverId: (moverId: number | null) => void = () => {};
  static moverId: number | null = null; // on start or join game
  static setSelectedSquare: (sqare: Square | null) => void = () => {};
  static setGameStatus: (gameStatus: string | null) => void = () => {};
  static setWinerId: (winerId: number | null) => void = () => {};
  static initSocket({
    n,
    userId,
    setPageStatus,
    setHistory,
    setMoverId,
    setMoveStatus,
    setGameStatus,
    setWinerId,
  }: useConnectType) {
    this.setWinerId = setWinerId;
    this.setGameStatus = setGameStatus;
    this.setPageStatus = setPageStatus;
    this.setHistory = setHistory;
    this.setMoverId = setMoverId;
    this.setMoveStatus = setMoveStatus;
    this.socket = io(API_URL + "events", {
      extraHeaders: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    this.socket.on("connect", () => {
      this.n = n;
      this.userId = userId;
    });

    this.socket.on(
      "inGame",
      ({
        n,
        history,
        roomId,
        whiteId,
        blackId,
      }: {
        n: number;
        history: Move[];
        roomId: string;
        whiteId: number;
        blackId: number;
      }) => {
        if (this.n != n) {
          setPageStatus("you already in game" + { n } + "x" + { n });
          return;
        }
        this.history = history;
        this.setHistory(this.history);
        this.roomId = roomId;
        this.whiteId = whiteId;
        this.blackId = blackId;
        this.moverId = this.whiteId;
        if (history.length % 2 == 1) {
          this.moverId = this.blackId;
        }
        this.setMoverId(this.moverId);
        this.setPageStatus("start game");
        this.setMoveStatus("can move");
      }
    );

    this.socket.on("page status", (status: string) => {
      setPageStatus(status);
    });

    this.socket.on("move", (move: Move) => {
      if (
        move &&
        move.from &&
        move.to &&
        move.from.y &&
        move.from.x &&
        move.to.y &&
        move.to.x
      ) {
        if (
          !this.lastmove ||
          this.lastmove.from.x != move.from.x ||
          this.lastmove.from.y != move.from.y ||
          this.lastmove.to.x != move.to.x ||
          this.lastmove.to.y != move.to.y
        ) {
          this.lastmove = move;
          this.history.push(move);
          this.setHistory(this.history);
          this.moveStatus = "can move";
          this.setSelectedSquare(null);
          this.setMoveStatus(this.moveStatus);
          this.moverId =
            this.moverId === this.whiteId ? this.blackId : this.whiteId;
          this.setMoverId(this.moverId);
        }
      }
      else {
        this.moveStatus = "can move";
        setMoveStatus(this.moveStatus);
      }
    });

    this.socket.on("move status", (status: string) => {
      this.moveMessage = status;
      this.moveStatus = "can move";
      this.setSelectedSquare(null);
      this.setMoveStatus(this.moveStatus);
    });

    this.socket.on("game status", (status: string) => {
        this.setGameStatus(status);
    });

    this.socket.on("winer", (winerId: number) => {
      this.setWinerId(winerId);
    });

    this.socket.on("disconnect", () => {});
  }

  static createGame(setRoomId: (roomId: null | string) => void) {
    this.socket?.emit("createRoom", {
      n: this.n,
      userId: this.userId,
    });
    this.socket?.on("getRoomId", (roomId: string) => {
      setRoomId(roomId);
      this.roomId = roomId;
    });
    this.socket?.on(
      "start game",
      (data: { whiteId: null | number; blackId: null | number }) => {
        this.setPageStatus("start game");
        this.whiteId = data.whiteId;
        this.blackId = data.blackId;
        this.moverId = this.whiteId;
        this.setMoverId(this.moverId);
      }
    );
    this.socket?.on("page status", (status: string) => {
      this.setPageStatus(status);
    });
  }

  static joinRoom(roomId: string) {
    this.socket?.emit("joinRoom", {
      roomId: roomId,
      userId: this.userId,
      n: this.n,
    });
    this.socket?.on(
      "start game",
      (data: { whiteId: null | number; blackId: null | number }) => {
        this.setPageStatus("start game");
        this.roomId = roomId;
        this.whiteId = data.whiteId;
        this.blackId = data.blackId;
        this.moverId = this.whiteId;
        this.setMoverId(this.moverId);
      }
    );
    this.socket?.on("page status", (status: string) => {
      this.setPageStatus(status);
    });
  }

  static surrender() {
    this.socket?.emit("surrender");
    this.setPageStatus("surrender");
  }

  static move(move: Move, setSelectedSquare: (sqare: Square | null) => void) {
    this.socket?.emit("move", {
      moveFrom: { x: move.from.y, y: move.from.x },
      moveTo: { x: move.to.y, y: move.to.x },
    });
    this.moveStatus = "wait for move";
    this.setMoveStatus(this.moveStatus);
    this.setSelectedSquare = setSelectedSquare;
    this.socket?.on("page status", (status: string) => {
      this.setPageStatus(status);
    });
  }

  static getGame() {
    const game = {
      history: this.history,
      n: this.n,
      roomId: this.roomId,
      whiteId: this.whiteId,
      blackId: this.blackId,
      moverId: this.moverId,
      userId: this.userId,
      moveStatus: this.moveStatus,
      surrender: this.surrender,
    };
    return game;
  }
}

export default SocketApi;
