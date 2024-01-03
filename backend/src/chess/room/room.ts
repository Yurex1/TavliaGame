import { ConflictException } from "@nestjs/common";
import GameManager from "./gameManager";
import { PrismaService } from "src/prisma.service";
import { MoveResult } from "./Board";
import { User } from "@prisma/client";


interface Move {
    from: { x: number, y: number },
    to: { x: number, y: number },
}

export class Room {
    public size = 0;
    public firstLogout: number | null = null;
    public player1EverJoined: number | null = null;
    public player2EverJoined: number | null = null
    public player1: number | null = null
    public player2: number | null = null;
    public gameManager: GameManager;
    private prismaService: PrismaService;
    public gameMoves: Move[] = [];
    private whoWinIfSurrender: User | null = null;

    constructor(player1: number, n: number, prismaService: PrismaService) {
        this.player1 = player1
        this.player1EverJoined = player1;
        this.size = 1
        this.gameManager = new GameManager(n)
        this.prismaService = prismaService

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

    public whoWin() {
        const isKingWin = this.gameManager.isKingWin();
        if (this.whoWinIfSurrender) {
            return this.whoWinIfSurrender.id;
        }
        if (isKingWin) {
            if (this.player2) {
                return this.player2;
            }
            else {
                throw new Error('player 2 wins, but null')
            }
        }
        else {
            if (this.player1) {
                return this.player1;
            }
            else {
                throw new Error('player 1 wins, but nulll')
            }
        }
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
        // console.log("Add player, ", this.size)
        if (!this.size) {
            return "No players in room";
        }

        if (!this.player1) {
            this.player1 = id;
            this.size = 2;
        }
        else if (!this.player2) {
            this.player2 = id;
            if (!this.player2EverJoined) {
                this.player2EverJoined = this.player2
            }
            this.size = 2;
        }
        else {
            throw new Error();
        }


    }

    public removePlayer(id: number) {

        if (this.size === 1) {
            this.size = 0;
            return '0 players left'
        }
        else if (this.size === 2) {
            this.size = 1;
            this.firstLogout = id;
            if (this.player1 === id) {
                this.player1 = null;
            }
            else {
                this.player2 = null;
            }
            return "1 player left"
        }

    }

    public async saveGame() {
        const winner = this.whoWin();
        await this.prismaService.game.create({
            data:
            {
                winner: winner,
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

    public async surrender(loserId: number): Promise<boolean> {

        if (!this.player1 || !this.player2) {

            return false;
        }
        let loser: User, winner: User;
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
                winner: this.whoWin(),
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
        await this.prismaService.user.update({ where: { id: winner.id }, data: { rank: winner.rank + 25 } })
        await this.prismaService.user.update({ where: { id: loser.id }, data: { rank: loser.rank - 25 } })
        this.whoWinIfSurrender = winner;
        return true;
    }
}