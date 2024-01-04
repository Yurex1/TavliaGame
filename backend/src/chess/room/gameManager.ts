import Board, { MoveResult } from "./Board";

export default class GameManager {
    gameBoard: Board;
    currentPlayer: number; // 0 - black second, 1 - white first
    n: number;

    constructor(n: number) {

        this.n = n;
        this.gameBoard = new Board(this.n);
        this.currentPlayer = 1;
    }

    public ChangePlayerMoves = () => this.currentPlayer = 1 - this.currentPlayer;

    public processMove = (from: { x: number, y: number }, to: { x: number, y: number }): MoveResult => {
        [from.x, from.y] = [from.y, from.x];
        [to.x, to.y] = [to.y, to.x];

        const result = this.gameBoard.makeMove(from, to, this.currentPlayer);
        if (result.result === 'OK') {
            this.ChangePlayerMoves();
        }
        return result
    }

    public isGameEnded() {
        return this.gameBoard.isGameEnded();
    }

    public isKingWin() {
        return this.gameBoard.KingWins;
    }



}