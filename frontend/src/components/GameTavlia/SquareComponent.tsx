import { Square } from "@/models/Square";
import { FC } from "react";

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
        </div>
    );
}

export default SquareComponent;