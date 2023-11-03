import { EventsGateway } from "./events.gateway";
export declare class EventsController {
    private readonly eventGateway;
    constructor(eventGateway: EventsGateway);
    joinRoom(body: {
        roomName: string;
    }): string;
}
