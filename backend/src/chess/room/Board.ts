import Figure from "./Figure";
import { FigureType } from "./Figure";

type MoveResultOk = {
    die: { x: number, y: number }[],
    result: "OK",
}

type MoveResultWrong = {
    result: "WRONG"
}

type MoveResultEndGame = {
    result: "END GAME"
}

export type MoveResult = MoveResultOk | MoveResultWrong | MoveResultEndGame

export default class Board {
    cells: Figure[][] = [];
    n: number;
    public isEndGame: boolean;
    public KingWins: boolean;
    constructor(n: number) {
        this.n = n;
        this.isEndGame = false;
        this.initializeBoard();
        // this.test();
    }

    test() {
        for (let i = 0; i < this.n; i++) {
            for (let j = 0; j < this.n; j++) {
                process.stdout.write(this.cells[i][j].FigureType.toString());
            }
            console.log()

        }
        console.log("\n\n\n")
    }

    initializeBoard() {
        for (let i = 0; i < this.n; i++) {
            const row: Figure[] = [];
            for (let j = 0; j < this.n; j++) {
                if ((i == (this.n - 1) / 2 && j == (this.n - 1) / 2)) {
                    row.push(new Figure({ x: j, y: i }, FigureType.King))
                    // this.board[j][i].FigureType = 3; // king

                }
                else if (((i == 0 || i == this.n - 1 || j == 0 || j == this.n - 1) && ((i > 2 && i < this.n - 3) || (j > 2 && j < this.n - 3)))) {
                    row.push(new Figure({ x: j, y: i }, FigureType.Attacker))
                    // this.board[j][i].FigureType = 1; // attacker

                }
                else if ((i == (this.n - 1) / 2 && (j == 1 || j == this.n - 2)) || (j == (this.n - 1) / 2 && (i == 1 || i == this.n - 2))) {
                    row.push(new Figure({ x: j, y: i }, FigureType.Attacker))
                    // this.board[j][i].FigureType = 1; // attacker
                }
                else if ((i == (this.n - 1) / 2 && j > (this.n - 1) / 2 - 3 && j < (this.n - 1) / 2 + 3) || (j == (this.n - 1) / 2 && i > (this.n - 1) / 2 - 3 && i < (this.n - 1) / 2 + 3)) {
                    row.push(new Figure({ x: j, y: i }, FigureType.Defender))
                    // this.board[j][i].FigureType = 2; //defender

                }
                else if (i > 3 && j > 3 && i < this.n - 4 && j < this.n - 4) {
                    row.push(new Figure({ x: j, y: i }, FigureType.Defender))
                    // this.board[j][i].FigureType = 2; //defender
                }
                else {
                    row.push(new Figure({ x: j, y: i }, FigureType.Empty))
                }
            }
            this.cells.push(row);
        }
    }

    isGameEnded() {
        return this.isEndGame;
    }



    areAllHeighboringPositionCoveredByBlack() {
        let kingPosition = { x: -1, y: -1 };
        for (let i = 0; i < this.n; i++) {
            for (let j = 0; j < this.n; j++) {
                if (this.cells[i][j].FigureType === FigureType.King) {
                    kingPosition = { x: i, y: j };
                    break;
                }
            }
            if (kingPosition.x !== -1) {
                break;
            }
        }

        if (kingPosition.x === -1 || kingPosition.y === -1) {

            return false;
        }

        const isCoveredByBlack = (x, y) => this.cells[x][y].FigureType === FigureType.Attacker;
        const positionsToCheck = [
            { x: kingPosition.x - 1, y: kingPosition.y },
            { x: kingPosition.x + 1, y: kingPosition.y },
            { x: kingPosition.x, y: kingPosition.y - 1 },
            { x: kingPosition.x, y: kingPosition.y + 1 },
        ];

        return positionsToCheck.every(position => {
            const { x, y } = position;
            return x >= 0 && x < this.n && y >= 0 && y < this.n && isCoveredByBlack(x, y);
        });
    }


    isWhite(cell: { x: number, y: number }): boolean {

        return this.cells[cell.x][cell.y].FigureType === FigureType.King || this.cells[cell.x][cell.y].FigureType === FigureType.Defender;
    }

    isBlack(cell: { x: number, y: number }): boolean {
        return this.cells[cell.x][cell.y].FigureType === FigureType.Attacker;
    }

    isFigureDies(cell: { x: number, y: number }): boolean {
        if (this.cells[cell.x][cell.y].FigureType === FigureType.Attacker) {

            if (cell.x > 1 && cell.x < this.n - 1 && this.isWhite({ x: cell.x + 1, y: cell.y }) && this.isWhite({ x: cell.x - 1, y: cell.y })) {
                this.cells[cell.x][cell.y].FigureType = FigureType.Empty
                return true;
            }
            else if (cell.y > 1 && cell.y < this.n - 1 && this.isWhite({ x: cell.x, y: cell.y + 1 }) && this.isWhite({ x: cell.x, y: cell.y - 1 })) {
                this.cells[cell.x][cell.y].FigureType = FigureType.Empty
                return true;
            }
        }
        if (this.cells[cell.x][cell.y].FigureType === FigureType.Defender) {
            if (cell.x > 0 && cell.x < this.n && this.isBlack({ x: cell.x + 1, y: cell.y }) && this.isBlack({ x: cell.x - 1, y: cell.y })) {
                this.cells[cell.x][cell.y].FigureType = FigureType.Empty
                return true;
            }
            else if (cell.y > 0 && cell.y < this.n && this.isBlack({ x: cell.x, y: cell.y + 1 }) && this.isBlack({ x: cell.x, y: cell.y - 1 })) {
                this.cells[cell.x][cell.y].FigureType = FigureType.Empty
                return true;
            }
        }
        return false;
    }

    makeMove(from: { x: number, y: number }, to: { x: number, y: number }, player: number): MoveResult {

        if (!this.isValidMove(from, to, player) || this.isEndGame) {
            return { result: "WRONG" };
        }

        this.cells[to.x][to.y].FigureType = this.cells[from.x][from.y].FigureType;
        this.cells[from.x][from.y].FigureType = FigureType.Empty;

        const die = [[0, 1], [1, 0], [0, -1], [-1, 0]].map(([dx, dy]) => [to.x + dx, to.y + dy]).filter(([nx, ny]) => nx >= 0 && nx < this.n && ny >= 0 && ny < this.n && this.isFigureDies({ x: nx, y: ny })).map(([y, x]) => ({ x, y }))

        this.test()

        if (this.cells[0][0].FigureType === FigureType.King || this.cells[0][this.n - 1].FigureType === FigureType.King || this.cells[this.n - 1][0].FigureType === FigureType.King || this.cells[this.n - 1][this.n - 1].FigureType === FigureType.King) {
            this.isEndGame = true;
            this.KingWins = true;
            return { result: "END GAME" };
        }
        else if (this.areAllHeighboringPositionCoveredByBlack()) {
            this.isEndGame = true;
            this.KingWins = false;
            return { result: "END GAME" };
        }

        return { result: "OK", die }
    }

    private isValidMove(from: { x: number, y: number }, to: { x: number, y: number }, player: number): boolean {
        const typeOfFigureFrom = this.cells[from.x][from.y].FigureType

        if (typeOfFigureFrom === 1 && player === 0 || (typeOfFigureFrom === 2 || typeOfFigureFrom === 3) && player === 1) {
            const allPossibleMoves = this.cells[from.x][from.y].possibleMoves(this);
            let isMovePossible: boolean = false;

            allPossibleMoves.forEach((el) => {

                if (el.x === to.x && el.y === to.y) {
                    isMovePossible = true;
                }
            });
            return isMovePossible;
        }
        else {
            return false;
        }
    }
}