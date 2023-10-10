import { useEffect, useState } from "react";
import BoardComponent from "./BoardComponent";
import { Board } from "../src/models/Board";
import Table from "./Table";

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