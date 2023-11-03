import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from "@nestjs/websockets";
import { EventsService } from "./events.service";
import { CreateEventDto } from "./dto/create-event.dto";
import { UpdateEventDto } from "./dto/update-event.dto";
import { Socket, Namespace, Server } from "socket.io";

@WebSocketGateway()
export class EventsGateway {
  constructor(private readonly eventsService: EventsService) {}
  RandomRoom = () => {
    let x: string = "";
    for (let i = 0; i < 22; i++) {
      x += String.fromCharCode(Math.random() * (90 - 65) + 65);
    }
    return x;
  };
  @WebSocketServer() server: Server;
  private gameMoves: string[] = [];

  @SubscribeMessage("joinRoom")
  handleJoinRoom(@MessageBody() data: any, client: Socket): void {
    const { roomName } = data;
    console.log("Name: ", roomName);
    if (client) {
      client.join(roomName);
      this.server
        .to(roomName)
        .emit("roomJoined", `${client.id} has joined the room`);
    }
  }

  @SubscribeMessage("move")
  handleMove(@MessageBody() body) {
    // this.server.emit("aa", body);
    console.log("Body: ", body);
    this.gameMoves.push(body);
    // console.log("Here", body, body.room, body.body);
    this.server.in("room1").emit(body);
  }

  @SubscribeMessage("end game")
  handleEndOfTheGame() {
    console.log("123123");
    return this.eventsService.endGame(this.gameMoves);
  }

  handleDisconnect(client: Socket) {
    console.log("Event disconnect, ");
  }
}
