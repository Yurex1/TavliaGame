"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const common_1 = require("@nestjs/common");
const events_service_1 = require("./events.service");
const socket_io_1 = require("socket.io");
const prisma_service_1 = require("../prisma.service");
let EventsGateway = class EventsGateway {
    constructor(eventsService, prismaService) {
        this.eventsService = eventsService;
        this.prismaService = prismaService;
        this.logger = new common_1.Logger();
        this.gameMoves = [];
        this.RandomRoom = () => {
            let x = "";
            for (let i = 0; i < 22; i++) {
                x += String.fromCharCode(Math.random() * (90 - 65) + 65);
            }
            console.log("Random: ", x);
            return x;
        };
    }
    handleConnection(client) {
        const sockets = this.io.sockets;
        this.logger.log("Client's id: " + client.id);
        this.logger.debug("Number of clients: " + sockets.size);
    }
    createRoom(socket) {
        const room = this.RandomRoom();
        socket.join(room);
        this.io.emit("createNewGame", { roomId: room });
    }
    joinRoom(socket, data) {
        const room = this.io.adapter.rooms.get(data.roomId);
        if (!room) {
            this.io.emit("status", "No room with this roomId");
            return;
        }
        else if (room.size >= 2) {
            this.io.emit("status", "This room already has 2 players");
            return;
        }
        socket.join(data.roomId);
        if (room.size === 2) {
            this.io.to(data.roomId).emit("start game");
        }
        this.io.to(data.roomId).emit(`Player joined room`);
    }
    handleMove(socket, data) {
        console.log("rooms: ", this.io.adapter.rooms);
        console.log("move: ", data.move, "roomId: ", data.roomId);
        if (this.io.adapter.rooms.get(data.roomId)) {
            console.log("Da");
            socket.broadcast.to(data.roomId).emit("move", data.move);
        }
        else {
            this.io.emit("move status", "No room with this roomId");
        }
    }
    async handleEndOfTheGame(data) {
        if (data.player1 === undefined ||
            data.player2 === undefined ||
            data.roomId === undefined) {
            return "Error. Data is undefined";
        }
        this.io.socketsLeave(data.roomId);
        const user1 = await this.prismaService.user.findUnique({
            where: { login: data.player1 },
        });
        const user2 = await this.prismaService.user.findUnique({
            where: { login: data.player2 },
        });
        return await this.prismaService.game.create({
            data: {
                moves: this.gameMoves,
                users: { connect: [{ id: user1.id }, { id: user2.id }] },
            },
        });
    }
    handleDisconnect(client) {
        console.log("Event disconnect, ");
    }
};
exports.EventsGateway = EventsGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Namespace)
], EventsGateway.prototype, "io", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)("createRoom"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], EventsGateway.prototype, "createRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("joinRoom"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], EventsGateway.prototype, "joinRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("move"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], EventsGateway.prototype, "handleMove", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("end game"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EventsGateway.prototype, "handleEndOfTheGame", null);
exports.EventsGateway = EventsGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        namespace: "events",
    }),
    __metadata("design:paramtypes", [events_service_1.EventsService,
        prisma_service_1.PrismaService])
], EventsGateway);
//# sourceMappingURL=events.gateway.js.map