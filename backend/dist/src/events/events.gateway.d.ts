import { EventsService } from "./events.service";
import { Socket, Server } from "socket.io";
export declare class EventsGateway {
    private readonly eventsService;
    constructor(eventsService: EventsService);
    RandomRoom: () => string;
    server: Server;
    private gameMoves;
    handleNewMove1(body: any): void;
    handleNewMove2(body: any): void;
    handleEndOfTheGame(): Promise<{
        id: number;
        move: string[];
    }>;
    handleDisconnect(client: Socket): void;
}
