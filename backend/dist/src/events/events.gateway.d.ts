import { OnGatewayConnection, OnGatewayDisconnect } from "@nestjs/websockets";
import { EventsService } from "./events.service";
import { Socket, Namespace } from "socket.io";
import { PrismaService } from "src/prisma.service";
export declare class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly eventsService;
    private prismaService;
    constructor(eventsService: EventsService, prismaService: PrismaService);
    io: Namespace;
    private logger;
    private gameMoves;
    RandomRoom: () => string;
    handleConnection(client: Socket): void;
    createRoom(socket: Socket): void;
    joinRoom(socket: Socket, data: {
        roomId: string;
    }): void;
    handleMove(socket: Socket, data: {
        move: any;
        roomId: any;
    }): void;
    handleEndOfTheGame(data: {
        roomId: any;
        player1: any;
        player2: any;
    }): Promise<"Error. Data is undefined" | {
        id: number;
        moves: string[];
    }>;
    handleDisconnect(client: Socket): void;
}
