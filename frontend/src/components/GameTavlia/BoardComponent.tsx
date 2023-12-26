import { Status } from "@/models/Board";
import React, {useEffect, useState } from "react";
import { FC } from "react";
import SquareComponent from "./SquareComponent";
import { Square } from "@/models/Square";
import { Game } from "@/models/Game";
import { Colors } from "@/models/Colors";

interface BoardProps {
  game: Game;
  setMove : (move: Colors) => void;
  setHistory : (history: any) => void;
  setStatus : (status: Status) => void;
}

const BoardComponent: FC<BoardProps> = ({ game, setMove, setHistory, setStatus}) => {
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);

  function click(square: Square) {
    if(game.status != Status.PLAYING) return;
    if (selectedSquare && selectedSquare == square) {
      game.board.highlightSquares(null);
      setSelectedSquare(null);
      return;
    }
    if (selectedSquare && selectedSquare.figure?.canMove(square)) {
      selectedSquare.moveFigure(square);
      game.board.highlightSquares(null);
      setSelectedSquare(null);
      game.changeColor();
      return;
    }
    if (square.figure && square.figure.color == game.color) {
      game.board.highlightSquares(square);
      setSelectedSquare(square);
    }
  }

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
      <div className="board">
      {game.board.squares.map((row, i) => (
        <React.Fragment key={i}>
          {row.map((square) => (
            <SquareComponent
              click={click}
              selected={
                square.x == selectedSquare?.x && square.y == selectedSquare?.y
              }
              square={square}
              key={square.id}
            />
          ))}
        </React.Fragment>
      ))}
    </div></>

  );
};

export default BoardComponent;
