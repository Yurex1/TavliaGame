import Figure from "./Figure";
import Player from "./Player";
import { FigureType } from "./Figure";
export default class Board {
    board: Figure[][] = [];
    n: number;
    public isEndGame: boolean;
    public KingWins: boolean;
    constructor(n: number) {
        this.n = n;
        this.isEndGame = false;
        this.initializeBoard();
        // this.test();
    }

    initializeBoard() {
        for (let i = 0; i < this.n; i++) {
            const row: Figure[] = [];
            for (let j = 0; j < this.n; j++) {
                if ((i == (this.n - 1) / 2 && j == (this.n - 1) / 2)) {
                    row.push(new Figure({ x: j, y: i }, 3))
                    // this.board[j][i].FigureType = 3; // king

                }
                else if (((i == 0 || i == this.n - 1 || j == 0 || j == this.n - 1) && ((i > 2 && i < this.n - 3) || (j > 2 && j < this.n - 3)))) {
                    row.push(new Figure({ x: j, y: i }, 1))
                    // this.board[j][i].FigureType = 1; // attacker

                }
                else if ((i == (this.n - 1) / 2 && (j == 1 || j == this.n - 2)) || (j == (this.n - 1) / 2 && (i == 1 || i == this.n - 2))) {
                    row.push(new Figure({ x: j, y: i }, 1))
                    // this.board[j][i].FigureType = 1; // attacker
                }
                else if ((i == (this.n - 1) / 2 && j > (this.n - 1) / 2 - 3 && j < (this.n - 1) / 2 + 3) || (j == (this.n - 1) / 2 && i > (this.n - 1) / 2 - 3 && i < (this.n - 1) / 2 + 3)) {
                    row.push(new Figure({ x: j, y: i }, 2))
                    // this.board[j][i].FigureType = 2; //defender

                }
                else if (i > 3 && j > 3 && i < this.n - 4 && j < this.n - 4) {
                    row.push(new Figure({ x: j, y: i }, 2))
                    // this.board[j][i].FigureType = 2; //defender
                }
                else {
                    row.push(new Figure({ x: j, y: i }, 0))
                }
            }
            this.board.push(row);
        }
    }

    isGameEnded() {
        return this.isEndGame;
    }



    areAllHeighboringPositionCoveredByBlack() {
        let kingPosition = { x: String = null, y: String = null }
        for (let i = 0; i < this.n; i++) {
            for (let j = 0; j < this.n; j++) {
                if (this.board[i][j].FigureType === 3) {
                    kingPosition.x = i,
                        kingPosition.y = j;
                    break;
                }
            }
            if (kingPosition.x !== null) {
                break;
            }
        }
        const isCoveredByBlack = (x, y) => this.board[x][y].FigureType === FigureType.Defender;
        const positionsToCheck = [
            { x: kingPosition.x - 1, y: kingPosition.y },
            { x: kingPosition.x + 1, y: kingPosition.y },
            { x: kingPosition.x, y: kingPosition.y - 1 },
            { x: kingPosition.x, y: kingPosition.y + 1 },
        ];

        let allNeighboringPositionsCovered = true;

        for (const position of positionsToCheck) {
            const { x, y } = position;

            // Check if the position is valid and covered by a black figure
            if (x >= 0 && x < this.n && y >= 0 && y < this.n && !isCoveredByBlack(x, y)) {
                allNeighboringPositionsCovered = false;
                break;
            }
        }
        if (allNeighboringPositionsCovered) {
            return true;
        }
        return false;
    }

    makeMove(from: { x: number, y: number }, to: { x: number, y: number }, player: Player) {

        if (!this.isValidMove(from, to, player) || this.isEndGame) {
            return false;
        }
        else {

            this.board[to.x][to.y].FigureType = this.board[from.x][from.y].FigureType;
            this.board[from.x][from.y].FigureType = 0;

            if (this.board[0][0].FigureType === 3 || this.board[0][this.n - 1].FigureType === 3 || this.board[this.n - 1][0].FigureType === 3 || this.board[this.n - 1][this.n - 1].FigureType === 3) {
                this.isEndGame = true;
                this.KingWins = true;
                return "Eng game";
            }
            else if (this.areAllHeighboringPositionCoveredByBlack()) {
                this.isEndGame = true;
                this.KingWins = false;
                return "Eng game";
            }
            return true;

        }
    }

    private isValidMove(from: { x: number, y: number }, to: { x: number, y: number }, player: Player): boolean {
        const typeOfFigureFrom = this.board[from.x][from.y].FigureType

        if (typeOfFigureFrom === 1 && player.role === 0 || (typeOfFigureFrom === 2 || typeOfFigureFrom === 3) && player.role === 1) {
            const allPossibleMoves = this.board[from.x][from.y].possibleMoves(this);
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