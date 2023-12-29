import { Status } from "@/models/Board";
import { Colors } from "@/models/Colors";
import { Game } from "@/models/Game";
import React, { FC, useState } from "react";
import SquareComponent from "../GameTavlia/SquareComponent";
import { Square } from "@/models/Square";
import SocketApi from "@/api/socket-api";
import TableOnline from "./TableOnline";

type OnlineTavliaGameProps = {
  n: number;
  userId: number;
  roomId: string | null;
  color: string;
};

const OnlineTavliaGame: FC<OnlineTavliaGameProps> = ({ color, n }) => {
  const [game, ] = useState(new Game(n));
  const [status, setStatus] = useState(Status.PLAYING);
  const [history, setHistory] = useState(game.history);
  const [move, setMove] = useState(Colors.WHITE);
  const [Loading, setLoading] = useState(false);
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);
  function click(square: Square) {
    if (color != move || Loading) return;
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

  SocketApi.socket?.on(
    "move",
    (
      data:
        | string
        | { from: { x: number; y: number }; to: { x: number; y: number } }
    ) => {
      if (typeof data == "string") {
        if (data == "End of the game") {
          alert(data);
          return;
        }
        if (data == "Incorrect move") {
          alert(data);
          setLoading(false);
          setSelectedSquare(null);
          return;
        }
        return;
      }
      const from = game.board.getSquare(data.from.x, data.from.y);
      const to = game.board.getSquare(data.to.x, data.to.y);
      from.moveFigure(to);
      game.board.highlightSquares(null);
      setSelectedSquare(null);
      setLoading(false);
      setStatus(game.status);
      setMove(game.color);
      setHistory(game.history);
    }
  );

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
        <TableOnline
          status={status}
          history={history}
          move={move}
          color={color}
        />
      </div>
    </>
  );
};

export default OnlineTavliaGame;
