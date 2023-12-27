import { useEffect, useState } from "react";
import BoardComponent from "./BoardComponent";
import { Game } from "@/models/Game";
import Table from "./Table";
import { Colors } from "@/models/Colors";
import { Status } from "@/models/Board";

export default function GameTavlia({ n }: any) {
  const [game, setGame] = useState(new Game(n));
  const [status, setStatus] = useState(Status.PLAYING);
  const [history, setHistory] = useState(game.history);
  const [move, setMove] = useState(Colors.WHITE);

  useEffect(() => {
    const savedHistory = localStorage.getItem("history" + n);
    if (savedHistory) setGame(new Game(n, JSON.parse(savedHistory)));
    else setGame(new Game(n));
  }, []);

  useEffect(() => {
    history.length > 0 &&
      localStorage.setItem("history" + n, JSON.stringify(history));
  }, [history.length]);

  function restart() {
    localStorage.removeItem("history" + n);
    setGame(new Game(n));
  }

  return (
    <div className="game">
      <BoardComponent
        game={game}
        setMove={setMove}
        setHistory={setHistory}
        setStatus={setStatus}
      />
      <Table restart={restart} status={status} move={move} history={history} />
    </div>
  );
}
