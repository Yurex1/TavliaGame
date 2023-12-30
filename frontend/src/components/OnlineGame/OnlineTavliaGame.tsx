import { Status } from "@/models/Board";
import { Colors } from "@/models/Colors";
import { Game, Move } from "@/models/Game";
import React, { FC, useState } from "react";
import SquareComponent from "../GameTavlia/SquareComponent";
import { Square } from "@/models/Square";
import SocketApi from "@/api/socket-api";
import TableOnline from "./TableOnline";
import { SocketApiType } from "@/hooks/useConnect";

type OnlineTavliaGameProps = {
  socket: SocketApiType;
};

const OnlineTavliaGame: FC<OnlineTavliaGameProps> = ({socket }) => {
  const [game, ] = useState(new Game(socket.n!, socket.history));
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);
  function click(square: Square) {
    if (socket.moverId != socket.userId && socket.moveStatus == "can move" && game.status==Status.PLAYING) return;
    if (selectedSquare && selectedSquare == square) {
      game.board.highlightSquares(null);
      setSelectedSquare(null);
      return;
    }
    if (selectedSquare && selectedSquare.figure?.canMove(square)) {
      const move : Move = {from: {x: selectedSquare.x, y: selectedSquare.y}, to: {x: square.x, y: square.y}};
      SocketApi.move(move);
      return;
    }
    if (square.figure && square.figure.color == game.color) {
      game.board.highlightSquares(square);
      setSelectedSquare(square);
    }
  }

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
          socket={socket}
        />
      </div>
    </>
  );
};

export default OnlineTavliaGame;
