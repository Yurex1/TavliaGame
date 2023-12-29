import Board from "./Board";
import Player from "./Player";

export default class GameManager {
    gameBoard: Board;
    players: Player[];
    currentPlayer: Player;
    n: number;

    constructor(players: Array<Player>, n: number) {
        this.players = players;
        this.n = n;
        this.gameBoard = new Board(this.n);
        this.currentPlayer = players[0];
    }

    public ChangePlayerMoves = () => this.currentPlayer = this.currentPlayer === this.players[1] ? this.players[0] : this.players[1];

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

    public addPlayer(id: string) {
        if (this.players[1].id === null) {
            this.players[1].id = id;
            this.players[1].role = 0;
        }
    }

    public isGameEnded() {
        return this.gameBoard.isGameEnded();
    }

    public isKingWin() {
        return this.gameBoard.KingWins;
    }



}