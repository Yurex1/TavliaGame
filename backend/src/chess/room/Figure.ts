import Board from "./Board"

export enum FigureType {
    Empty,
    Attacker,
    Defender,
    King,
}

export default class Figure {
    position: { x: number, y: number };
    FigureType: FigureType;

    // constructor() {
    //     this.FigureType = null;
    //     this.position = null;
    // }

    constructor(position?: { x: number, y: number }, type?: FigureType) {
        this.position = position;
        this.FigureType = type;
    }


    isEmpty(): boolean {
        if (this.FigureType === 0) {
            return true;
        }
        return false;
    }

    possibleMoves(board: Board): Array<{ x: number, y: number }> {
        const temp_x = this.position.y;
        const temp_y = this.position.x;
        const result: Array<{ x: number, y: number }> = [];
        for (let i = temp_x + 1; i < board.n; i++) {
            if (board.cells[i][temp_y].FigureType === FigureType.Empty) {
                result.push({ x: i, y: temp_y });
            }
            else {
                break;
            }
        }
        for (let i = temp_x - 1; i >= 0; i--) {
            if (board.cells[i][temp_y].FigureType === FigureType.Empty) {
                result.push({ x: i, y: temp_y });
            }
            else {
                break;
            }
        }
        for (let i = temp_y + 1; i < board.n; i++) {
            if (board.cells[temp_x][i].isEmpty()) {
                result.push({ x: temp_x, y: i });
            }
            else {
                break;
            }
        }
        for (let i = temp_y - 1; i >= 0; i--) {
            if (board.cells[temp_x][i].isEmpty()) {
                result.push({ x: temp_x, y: i });
            }
            else {
                break;
            }
        }
        const coordinatesToRemove: { x: number, y: number }[] = [
            { x: 0, y: 0 },
            { x: 0, y: board.n - 1 },
            { x: board.n - 1, y: 0 },
            { x: board.n - 1, y: board.n - 1 }
        ]
        if (this.FigureType !== FigureType.King) {
            const new_result = result.filter((el) => { return !coordinatesToRemove.some((coord) => el === coord) })
            return new_result;
        }
        return result;
    }
}