import { ConflictException } from "@nestjs/common";

enum ChessPiece {
    Pawn,
    Rook,
    Knight,
    Bishop,
    Queen,
    King,
}

enum Player {
    White,
    Black,
}

class ChessBoard {
}

class PlayerMove {
}

export class Room {
    private _size = 0;
    private players: { [key in Player]: string };

    constructor(player1: string, player2: string) {
        this.players = {
            [Player.White]: player1,
            [Player.Black]: null,
        };
        this._size = 1
    }


    get size(): number {
        return this._size;
    }


    private board: ChessBoard;



    public playerMoves = 1;

    public ChangePlayerMoves = () => this.playerMoves ^ 1;

    public position: string[8][8];

    public makeMove(move: PlayerMove): void {

    }

    public addPlayer(id: string) {
        if (this.players[Player.Black] === null) {
            this.players[Player.Black] = id;
            this._size = 2;
        }
        else {
            throw new ConflictException();
        }
    }

    public getGameState(): ChessBoard {
        return this.board;
    }

    public getCurrentPlayer(): string {
        return this.players[Player.White]; // Повертаємо ідентифікатор поточного гравця (може бути користувачем або іншим ідентифікатором)
    }

}