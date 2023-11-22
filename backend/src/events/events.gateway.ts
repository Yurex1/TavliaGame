import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  WsResponse,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from "@nestjs/websockets";
import { Logger, NotFoundException } from "@nestjs/common";
import { EventsService } from "./events.service";
import { CreateEventDto } from "./dto/create-event.dto";
import { UpdateEventDto } from "./dto/update-event.dto";
import { Socket, Namespace, Server } from "socket.io";
import { io } from "socket.io-client";
import { PrismaService } from "src/prisma.service";
import { Room } from "src/chess/room/room";

@WebSocketGateway({
  namespace: "events",
})
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly eventsService: EventsService,
    private prismaService: PrismaService
  ) { }

  @WebSocketServer() io: Namespace;
  private logger = new Logger();
  private gameMoves: string[] = [];
  private rooms: Map<string, Room> = new Map();


  RandomRoom = (): string => {
    let x: string = "";
    for (let i = 0; i < 22; i++) {
      x += String.fromCharCode(Math.random() * (90 - 65) + 65);
    }
    return x;
  };

  handleConnection(client: Socket) {
    const sockets = this.io.sockets;
    this.logger.log("Client's id: " + client.id);
    this.logger.debug("Number of clients: " + sockets.size);
  }

  @SubscribeMessage("createRoom")
  createRoom(socket: Socket) {
    const roomId: string = this.RandomRoom();
    socket.join(roomId);

    this.rooms.set(roomId, new Room(roomId, socket.id));
    socket.emit('getRoomId', roomId)
    // this.io.emit("createNewGame", { roomId: roomId });
  }

  @SubscribeMessage("joinRoom")
  joinRoom(socket: Socket, data: { roomId }) {
    console.log("Room: ", data.roomId)
    const room = this.rooms.get(data.roomId);
    if (!room) {
      socket.emit("status", "No room with this roomId");
      return;
    } else if (room.size >= 2) {
      socket.emit("status", "This room already has 2 players");
      return;
    }
    socket.join(data.roomId);
    room.addPlayer(socket.id);
    if (room.size === 2) {
      this.io.to(data.roomId).emit("status", "start game");
    }
    else {
      this.io.to(data.roomId).emit(`Player joined room`);
    }
  }

  @SubscribeMessage("move")
  handleMove(socket: Socket, data: { move }) {
    console.log()
    const room = this.rooms.get(socket.rooms[0]);
    if (room) {
      socket.broadcast.to(socket.rooms[0]).emit("move", data.move);
      room.makeMove(data.move);
      // this.io.to(data.roomId).emit("move", data.move);
    } else {
      this.io.emit("move status", "No room with this roomId");
      throw new NotFoundException();
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
    console.log("Event disconnect ");
  }
}
