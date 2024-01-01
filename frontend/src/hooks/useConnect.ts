import SocketApi from "@/api/socket-api";
import { Square } from "@/models/Square";
import { Move } from "@/types/types"; 
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
    createGame: (setRoomId: (roomId: null|string ) => void) => void,
    joinRoom: (roomId: string) => void,
    surrender: () => void,
};

export type useConnectType = {
    n: number,
    userId: number,
    setPageStatus: (pageStatus: string|null) => void,
    setHistory: (history: Move[]) => void,
    setMoverId: (moverId: number | null) => void,
    setMoveStatus: (moveStatus: string) => void,
    setGameStatus: (gameStatus: string|null) => void,
    setWinerId: (winerId: number|null) => void,
};

export const useConnect = ({n, userId, setPageStatus, setHistory, setMoverId, setMoveStatus, setGameStatus, setWinerId} : useConnectType) => {
  const connectSocket = () => {
    SocketApi.initSocket({n, userId, setPageStatus, setHistory, setMoverId, setMoveStatus, setGameStatus, setWinerId});
  };

  useEffect(() => {
    connectSocket();
  }, []);

  const move = (move: Move, setSelectedSquare: (square: Square|null) => void) => {
    SocketApi.move(move, setSelectedSquare);
  };

  const createGame = (setRoomId: (roomId: null|string ) => void) => {
    SocketApi.createGame(setRoomId);
  };

  const joinRoom = (roomId: string) => {
    SocketApi.joinRoom(roomId);
  }

  return {...SocketApi.getGame(), move: move, createGame: createGame, joinRoom: joinRoom} as SocketApiType;
};