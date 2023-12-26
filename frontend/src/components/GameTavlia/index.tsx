import { useEffect, useState } from "react";
import BoardComponent from "./BoardComponent";
import { Game } from "@/models/Game";
import Table from "./Table";
import { Colors } from "@/models/Colors";
import { Status } from "@/models/Board";
export default function GameTavlia({n} : any) {
    const[game, setGame] = useState(new Game(n));
    const[status, setStatus] = useState(Status.PLAYING);
    const[history, setHistory] = useState(game.history);
    const[move, setMove] = useState(Colors.WHITE);

    useEffect(() => {
      console.log("restart");
      restart();
    },[n]);

    function restart(){
        setGame(new Game(n));
    }

    return (
        < div className = "game">
            <BoardComponent game={game} setMove = {setMove} setHistory = {setHistory} setStatus = {setStatus}/>
            <Table status = {status} move = {move} history={history}/>
        </div>
    );
}