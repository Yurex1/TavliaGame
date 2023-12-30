import { Status } from "@/models/Board";
import { Game, Move } from "@/models/Game";
import React, { FC, useEffect, useState } from "react";
import SquareComponent from "../GameTavlia/SquareComponent";
import { Square } from "@/models/Square";
import SocketApi from "@/api/socket-api";
import { SocketApiType } from "@/hooks/useConnect";

type OnlineTavliaGameProps = {
  socket: SocketApiType;
  history: Move[];
  userId: number;
  moverId: number | null;
  moveStatus: string;
};

const OnlineTavliaGame: FC<OnlineTavliaGameProps> = ({
  socket,
  history,
  userId,
  moverId,
}) => {
  const [game, setGame] = useState(new Game(socket.n!, socket.history));
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);
  function click(square: Square) {
    if (
      moverId == userId &&
      socket.moveStatus == "can move" &&
      game.status == Status.PLAYING
    ) {
      if (selectedSquare && selectedSquare == square) {
        game.board.highlightSquares(null);
        setSelectedSquare(null);
        return;
      }
      if (selectedSquare && selectedSquare.figure?.canMove(square)) {
        const move: Move = {
          from: { x: selectedSquare.x, y: selectedSquare.y },
          to: { x: square.x, y: square.y },
        };
        SocketApi.move(move, setSelectedSquare);
        return;
      }
      if (square.figure && square.figure.color == game.color) {
        game.board.highlightSquares(square);
        setSelectedSquare(square);
      }
    }
  }

  useEffect(() => {
    setGame(new Game(socket.n!, history));
  }, [history.length]);

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
        {/* <TableOnline
          socket={socket}
        /> */}
      </div>
    </>
  );
};

export default OnlineTavliaGame;
