import { Board } from "@/models/Board";
import React, { use, useEffect, useState } from "react";
import { FC } from "react";
import SquareComponent from "./SquareComponent";
import { Square } from "@/models/Square";

interface BoardProps{
    board: Board;
    setBoard: (board: Board) => void;
}

const BoardComponent: FC<BoardProps> = ({board, setBoard}) =>
{
    const[selectedSquare, setSelectedSquare] = useState<Square | null>(null);

    function click(square: Square){
        if(selectedSquare && selectedSquare == square){
            setSelectedSquare(null);
            return;
        }
        if(selectedSquare && selectedSquare.figure?.canMove(square)){
            selectedSquare.moveFigure(square);
            square.killEnemy();
            setSelectedSquare(null);
            return;
        }
        if(square.figure)
            setSelectedSquare(square);
    }

    useEffect(() => { 
        highlightSquares();
    }, [selectedSquare]);

    function highlightSquares(){
        board.highlightSquares(selectedSquare);
        updateBoard();
    }

    function updateBoard(){
        const newBoard = board.getCopyBoard();
        setBoard(newBoard);
    }

    return <div className="board">
        {
            board.squares.map((row, i) => 
                <React.Fragment key = {i}>
                    {
                        row.map(square => 
                            <SquareComponent 
                                click={click}
                                selected = {square.x == selectedSquare?.x && square.y == selectedSquare?.y}
                                square={square}
                                key={square.id}
                            />
                        )
                    }
                </React.Fragment>
            )
        }
    </div>;
}

export default BoardComponent;
