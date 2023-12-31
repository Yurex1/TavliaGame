import { Square } from "@/models/Square";
import { FC } from "react";
import React from "react";

interface SquareProps{
    square: Square;
    selected: boolean;
    click: (square: Square) => void;
}

const SquareComponent:FC<SquareProps> = ({square, selected, click}) => {
    return (
        <div 
            className={['square', square.color, ['square', square.board.n].join(''), selected ? "selected" : ""].join(' ')}
            onClick={() => click(square)}
            >
            {square.figure?.logo && <img src={square.figure.logo} alt=""/> }
            {square.avaliable  && <div className="avalible"></div>}
            {(square.x ==  square.board.n - 1)&& <b className="y">{String.fromCharCode(square.y + 65)}</b>}
            {!square.y && <b className="x">{square.x + 1}</b>}
        </div>
    );
}

export default SquareComponent;