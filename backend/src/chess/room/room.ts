import { ConflictException } from "@nestjs/common";
import GameManager from "./gameManager";
import { PrismaService } from "src/prisma.service";
import { MoveResult } from "./Board";


interface Move {
    from: { x: number, y: number },
    to: { x: number, y: number },
}

export class Room {
    private _size = 0;
    public firstLogout: number | null = null;
    public player2: number | null = null;
    public gameManager: GameManager;
    private prismaService: PrismaService;
    public gameMoves: Move[] = [];



    constructor(public player1: number, n: number, prismaService: PrismaService,) {
        this._size = 1;
        this.gameManager = new GameManager(n)
        this.prismaService = prismaService
    }

    get size(): number {
        return this._size;
    }


    public position: string[8][8];

    public makeMove(from: { x: number, y: number }, to: { x: number, y: number },): MoveResult {
        if (this.gameManager.isGameEnded()) {
            return { result: "END GAME" }
        }
        const moveResult = this.gameManager.processMove(from, to);
        if (moveResult.result !== 'WRONG') {
            this.gameMoves.push({
                from, to
            })
        }

        return moveResult
    }


    public youMove(playerId: number) {

        if (playerId === this.player1) {
            return this.gameManager.currentPlayer === 0;
        }
        else {
            return this.gameManager.currentPlayer === 1;
        }
    }

    public playerMove() {
        return this.gameManager.currentPlayer;
    }


    public addPlayer(id: number) {
        if (this.player2 === null) {
            this.player2 = id;
            this._size = 2;
        }
        else {
            throw new ConflictException();
        }
    }

    public removePlayer(id: number) {
        if (this.size === 2) {
            this._size = 1;
            this.firstLogout = id;
            return "1 player left"
        }
        else if (this.size === 1) {
            this._size = 0;
            return '0 players left'
        }
    }

    public async saveGame() {
        await this.prismaService.game.create({
            data:
            {

                users: {
                    connect: [
                        { id: this.player1 },
                        { id: this.player2 }
                    ]
                },
                Move: {
                    create: this.gameMoves.map(move => ({
                        fromX: move.from.x,
                        fromY: move.from.y,
                        toX: move.to.x,
                        toY: move.to.y
                    })),
                },
            },

        });
        const firstUser = await this.prismaService.user.findUnique({ where: { id: this.player1 } });
        const secondUser = await this.prismaService.user.findUnique({ where: { id: this.player2 } });
        const KingWins = this.gameManager.isKingWin();
        if (KingWins) {
            await this.prismaService.user.update({ where: { id: this.player1 }, data: { rank: firstUser.rank + 25 } })
            await this.prismaService.user.update({ where: { id: this.player2 }, data: { rank: secondUser.rank - 25 } })
        }
        else {
            await this.prismaService.user.update({ where: { id: this.player1 }, data: { rank: firstUser.rank - 25 } })
            await this.prismaService.user.update({ where: { id: this.player2 }, data: { rank: secondUser.rank + 25 } })
        }
    }

    public async surrender(loserId: number) {
        let loser, winner;
        if (loserId === this.player1) {
            loser = await this.prismaService.user.findUnique({ where: { id: this.player1 } });
            winner = await this.prismaService.user.findUnique({ where: { id: this.player2 } });;
        } else {
            loser = await this.prismaService.user.findUnique({ where: { id: this.player2 } });;
            winner = await this.prismaService.user.findUnique({ where: { id: this.player1 } });
        }
        await this.prismaService.game.create({
            data:
            {
                users: {
                    connect: [
                        { id: this.player1 },
                        { id: this.player2 }
                    ]
                },
                Move: {
                    create: this.gameMoves.map(move => ({
                        fromX: move.from.x,
                        fromY: move.from.y,
                        toX: move.to.x,
                        toY: move.to.y
                    })),
                },
            },

        });
        await this.prismaService.user.update({ where: { id: this.player1 }, data: { rank: winner.rank + 25 } })
        await this.prismaService.user.update({ where: { id: this.player2 }, data: { rank: loser.rank - 25 } })
    }
}