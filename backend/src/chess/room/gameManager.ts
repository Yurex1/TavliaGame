import Board from "./Board";

export default class GameManager {
    gameBoard: Board;

    currentPlayer: number;
    n: number;

    constructor(n: number) {

        this.n = n;
        this.gameBoard = new Board(this.n);
        this.currentPlayer = 1;
    }

    public ChangePlayerMoves = () => this.currentPlayer = 1 - this.currentPlayer;

    public processMove = (from: { x: number, y: number }, to: { x: number, y: number }) => {
        const result = this.gameBoard.makeMove(from, to, this.currentPlayer);
        if (!result) {
            return false;
        }
        if (result === "Eng game") {

            return "Eng game"
        }
        else {
            this.ChangePlayerMoves();
            return true;
        }

    }

    public isGameEnded() {
        return this.gameBoard.isGameEnded();
    }

    public isKingWin() {
        return this.gameBoard.KingWins;
    }



}