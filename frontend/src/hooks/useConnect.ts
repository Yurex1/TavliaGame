import SocketApi from "@/api/socket-api";
import { Move } from "@/models/Game";
import { useEffect } from "react";


export type SocketApiType = {
    history: Move[],
    status: string| null,
    n: number| null,
    roomId: string| null,
    userId: number| null,
    whiteId: number| null,
    blackId: number| null,
    moverId: number| null,
    moveStatus: string| null,
    move: (move: Move) => void,
    createGame: () => void,
    joinRoom: (roomId: string) => void,
};

export const useConnect = (n:number) => {
  const connectSocket = () => {
    SocketApi.initSocket(n);
  };

  useEffect(() => {
    connectSocket();
  }, []);

  const move = (move: Move) => {
    SocketApi.socket?.emit("move", move);
  };

  const createGame = () => {
    SocketApi.socket?.emit("createRoom");
  };

  const joinRoom = (roomId: string) => {
    SocketApi.socket?.emit("joinRoom", roomId);
  }

  return {...SocketApi.getGame(), move: move, createGame: createGame, joinRoom: joinRoom} as SocketApiType;
};