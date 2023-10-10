import { Colors } from "../Colors";
import { Square } from "../Square";
import { Figure, FigureNames } from "./Figure";

export class King extends Figure{
    constructor(color: Colors, square: Square) {
        super(color, square);
        this.logo = "king.png";
        this.name = FigureNames.KING;
    }

    canMove(target: Square): boolean {
        if(!super.canMove(target)) return false;
        return true;
    }
}