// app.controller.ts
import { Controller, Post, Body } from "@nestjs/common";
import { EventsGateway } from "./events.gateway";

@Controller()
export class EventsController {
  constructor(private readonly eventGateway: EventsGateway) {}

  @Post("join-room")
  joinRoom(@Body() body: { roomName: string }) {
    console.log(body);
    this.eventGateway.handleJoinRoom(body, null); // Pass null as the client in the WebSocket gateway
    return `Joined room: ${body.roomName}`;
  }
}
