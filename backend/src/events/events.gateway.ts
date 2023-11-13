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

  @SubscribeMessage("new move from 1")
  handleNewMove1(@MessageBody() body) {
    this.gameMoves.push(body);
    this.server.emit("onMessage1", {
      msg: "New Message",
      content: body,
    });
  }

  @SubscribeMessage("new move from 2")
  handleNewMove2(@MessageBody() body) {
    this.gameMoves.push(body);
    this.server.emit("onMessage2", {
      msg: "New Message",
      content: body,
    });
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
