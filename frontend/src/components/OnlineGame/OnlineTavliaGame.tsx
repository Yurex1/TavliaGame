import { Status } from "@/models/Board";
import { Colors } from "@/models/Colors";
import { Game } from "@/models/Game";
import React, { FC, useEffect, useState } from "react";
import BoardComponent from "../GameTavlia/BoardComponent";
import SquareComponent from "../GameTavlia/SquareComponent";
import { Square } from "@/models/Square";
import Table from "../GameTavlia/Table";
import { Socket } from "socket.io-client";
import SocketApi from "@/api/socket-api";
import { set } from "react-hook-form";

type OnlineTavliaGameProps = {
  n: number;
  userId: number;
  roomId: string | null;
  color: string;
};

const OnlineTavliaGame: FC<OnlineTavliaGameProps> = ({
  color,
  n,
  userId,
  roomId,
}) => {
  const [game, setGame] = useState(new Game(n));
  const [status, setStatus] = useState(Status.PLAYING);
  const [history, setHistory] = useState(game.history);
  const [move, setMove] = useState(Colors.WHITE);
  const [Loading, setLoading] = useState(false);
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);

  function click(square: Square) {
    if (game.color !== color || Loading) return;
    if (game.status != Status.PLAYING) return;
    if (selectedSquare && selectedSquare == square) {
      game.board.highlightSquares(null);
      setSelectedSquare(null);
      return;
    }
    if (selectedSquare && selectedSquare.figure?.canMove(square)) {
      setLoading(true);
      SocketApi.socket?.emit("move", {
        moveFrom: {
          x: selectedSquare.x,
          y: selectedSquare.y,
        },
        moveTo: {
          x: square.x,
          y: square.y,
        },
      });
      return;
    }
    if (square.figure && square.figure.color == game.color) {
      game.board.highlightSquares(square);
      setSelectedSquare(square);
    }
  }

  SocketApi.socket?.on("move", (data: any) => {
    if (data == "End of the game") {
      alert(data);
      return;
    }
    if (data == "Incorrect move") {
      alert(data);
      return;
    }
    const from = game.board.getSquare(data.from.x, data.from.y);
    const to = game.board.getSquare(data.to.x, data.to.y);
    from.moveFigure(to);
    game.board.highlightSquares(null);
    setSelectedSquare(null);
    setLoading(false);
  });

  useEffect(() => {
    setStatus(game.status);
  }, [game.status]);

  useEffect(() => {
    setMove(game.color);
  }, [game.color]);

  useEffect(() => {
    setHistory(game.history);
  }, [game.history]);

  return (
    <>
      <div className="game">
        <div className="board">
          {game.board.squares.map((row, i) => (
            <React.Fragment key={i}>
              {row.map((square) => (
                <SquareComponent
                  click={click}
                  selected={
                    square.x == selectedSquare?.x &&
                    square.y == selectedSquare?.y
                  }
                  square={square}
                  key={square.id}
                />
              ))}
            </React.Fragment>
          ))}
        </div>
        <Table
          status={status}
          move={move}
          history={history}
          restart={() => {}}
        />
      </div>
    </>
  );
};

export default OnlineTavliaGame;
