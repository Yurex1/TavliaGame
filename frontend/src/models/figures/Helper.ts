import { Colors } from "../Colors";
import { Square } from "../Square";
import { Figure, FigureNames } from "./Figure";
export class Helper extends Figure{
    constructor(color: Colors, square: Square) {
        super(color, square);
        this.logo = "helper.png";
        this.name = FigureNames.HELPER;
    }
    canMove(target: Square): boolean {
        if(!super.canMove(target)) return false;
        if(target.color === Colors.FINISH) return false;
        return true;
    }
}