import { Colors } from "../Colors";
import { Square } from "../Square";

export enum FigureNames {
    FIGURE = "Фігура",
    KING = "Король",
    HELPER = "Лицарь",
    TARGET = "Вікінг",
}

export class Figure {
    color: Colors;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    logo: any;
    square: Square;
    name: FigureNames;
    id: number;

    constructor(color: Colors, square: Square) {
        this.square = square;
        this.color = color;
        this.square.figure = this;
        this.logo = null;
        this.name = FigureNames.FIGURE;
        this.id = Math.random();
    }

    canMove(target: Square): boolean {
        if (!target.isEmpty()) return false;
        if (this.square.isEmptyVertcal(target)) return true;
        if (this.square.isEmptyHorizontal(target)) return true;
        return false;

    }
    // eslint-disable-next-line
    moveFigure(target: Square) { }
}