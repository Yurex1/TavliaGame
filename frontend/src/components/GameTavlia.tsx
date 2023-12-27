import { useEffect, useState } from "react";
import BoardComponent from "./BoardComponent";
import { Board } from "../models/Board";
import Table from "./Table";
import React from 'react'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function GameTavlia({n} : any) {
    const[board, setBoard] = useState(new Board(n));
    useEffect(() => {
        restart();
    },[n]);

    useEffect(() => {
        restart();
    }, []);

    function restart(){
        const newBoard = new Board(n);
        newBoard.addFigures();
        setBoard(newBoard);
    }
    return (
        < div className = "game">
            <BoardComponent board={board} setBoard={setBoard}/>
            <Table />
        </div>
    );
}