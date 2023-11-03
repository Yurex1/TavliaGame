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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const events_service_1 = require("./events.service");
const socket_io_1 = require("socket.io");
let EventsGateway = class EventsGateway {
    constructor(eventsService) {
        this.eventsService = eventsService;
        this.RandomRoom = () => {
            let x = "";
            for (let i = 0; i < 22; i++) {
                x += String.fromCharCode(Math.random() * (90 - 65) + 65);
            }
            return x;
        };
        this.gameMoves = [];
    }
    handleJoinRoom(data, client) {
        const { roomName } = data;
        console.log("Name: ", roomName);
        if (client) {
            client.join(roomName);
            this.server
                .to(roomName)
                .emit("roomJoined", `${client.id} has joined the room`);
        }
    }
    handleMove(body) {
        console.log("Body: ", body);
        this.gameMoves.push(body);
        this.server.in("room1").emit(body);
    }
    handleEndOfTheGame() {
        console.log("123123");
        return this.eventsService.endGame(this.gameMoves);
    }
    handleDisconnect(client) {
        console.log("Event disconnect, ");
    }
};
exports.EventsGateway = EventsGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], EventsGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)("joinRoom"),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], EventsGateway.prototype, "handleJoinRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("move"),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], EventsGateway.prototype, "handleMove", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("end game"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EventsGateway.prototype, "handleEndOfTheGame", null);
exports.EventsGateway = EventsGateway = __decorate([
    (0, websockets_1.WebSocketGateway)(),
    __metadata("design:paramtypes", [events_service_1.EventsService])
], EventsGateway);
//# sourceMappingURL=events.gateway.js.map