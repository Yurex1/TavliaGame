import { Colors } from "../Colors";
import { Square } from "../Square";
import { Figure, FigureNames } from "./Figure";
export class Target extends Figure{
    constructor(color: Colors, square: Square) {
        super(color, square);
        this.logo = "target.png";
        this.name = FigureNames.TARGET;
    }

    canMove(target: Square): boolean {
        if(!super.canMove(target)) return false;
        if(target.color === Colors.FINISH) return false;
        return true;
    }
}