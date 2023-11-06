import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  WsResponse,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from "@nestjs/websockets";
import { Logger } from "@nestjs/common";
import { EventsService } from "./events.service";
import { CreateEventDto } from "./dto/create-event.dto";
import { UpdateEventDto } from "./dto/update-event.dto";
import { Socket, Namespace, Server } from "socket.io";
import { io } from "socket.io-client";
import { PrismaService } from "src/prisma.service";

@WebSocketGateway({
  namespace: "events",
})
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly eventsService: EventsService,
    private prismaService: PrismaService
  ) {}

  @WebSocketServer() io: Namespace;
  private logger = new Logger();
  private gameMoves: string[] = [];

  RandomRoom = (): string => {
    let x: string = "";
    for (let i = 0; i < 22; i++) {
      x += String.fromCharCode(Math.random() * (90 - 65) + 65);
    }
    console.log("Random: ", x);
    return x;
  };

  handleConnection(client: Socket) {
    const sockets = this.io.sockets;
    this.logger.log("Client's id: " + client.id);
    this.logger.debug("Number of clients: " + sockets.size);
  }

  @SubscribeMessage("createRoom")
  createRoom(socket: Socket) {
    const room: string = this.RandomRoom();
    socket.join(room);
    this.io.emit("createNewGame", { roomId: room });
  }

  @SubscribeMessage("joinRoom")
  joinRoom(socket: Socket, data: { roomId: string }) {
    const room = this.io.adapter.rooms.get(data.roomId);
    if (!room) {
      this.io.emit("status", "No room with this roomId");
      return;
    } else if (room.size >= 2) {
      this.io.emit("status", "This room already has 2 players");
      return;
    }

    socket.join(data.roomId);
    if (room.size === 2) {
      this.io.to(data.roomId).emit("start game");
    }
    this.io.to(data.roomId).emit(`Player joined room`);
  }

  @SubscribeMessage("move")
  handleMove(socket: Socket, data: { move; roomId }) {
    console.log("rooms: ", this.io.adapter.rooms);
    console.log("move: ", data.move, "roomId: ", data.roomId);
    if (this.io.adapter.rooms.get(data.roomId)) {
      console.log("Da");
      socket.broadcast.to(data.roomId).emit("move", data.move);
      // this.io.to(data.roomId).emit("move", data.move);
    } else {
      this.io.emit("move status", "No room with this roomId");
    }
  }

  @SubscribeMessage("end game")
  async handleEndOfTheGame(data: { roomId; player1; player2 }) {
    if (
      data.player1 === undefined ||
      data.player2 === undefined ||
      data.roomId === undefined
    ) {
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

  handleDisconnect(client: Socket) {
    console.log("Event disconnect, ");
  }
}
