import { ConflictException } from "@nestjs/common";
import GameManager from "./gameManager";
import Player from "./Player";
import { PrismaService } from "src/prisma.service";

export class Room {
    private _size = 0;
    public players: Array<Player>;
    public gameManager: GameManager;
    constructor(player1: string, n: number,
    ) {
        this.players = new Array<Player>(2);
        this.players[0] = new Player(1, player1);
        this.players[1] = new Player(null, null);
        this._size = 1;
        this.gameManager = new GameManager(this.players, n)


    }

    get size(): number {
        return this._size;
    }

    public playerMoves = 1;


    public position: string[8][8];

    public makeMove(from: { x: number, y: number }, to: { x: number, y: number },) {
        let isGameOver: boolean = false;
        if (this.gameManager.isGameEnded()) {
            return "Game is over";
        }
        const moveResult = this.gameManager.processMove(from, to);
        if (moveResult === true) {
            return "Success";
        }
        else if (moveResult === "Eng game")
            return "Game is over";
        return "Error move"
    }

    public addPlayer(id: string) {
        if (this.players[1].id === null) {
            this.players[1].id = id;
            this.players[1].role = 0;
            this._size = 2;
        }
        else {
            throw new ConflictException();
        }
    }

    public removePlayer(id: string) {
        if (this.size === 2) {
            this._size = 1;
            return "1 player left"
        }
        else if (this.size === 1) {

        }
    }
}