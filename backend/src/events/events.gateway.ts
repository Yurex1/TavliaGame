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

interface Move {
  from: { x: number, y: number },
  to: { x: number, y: number },
}

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
  private gameMoves: Move[] = [];
  private rooms: Map<string, Room> = new Map();
  private firstUserId: number | null = null;
  private secondUserId: number | null = null;
  private isGameAlreadyInDatabase: boolean = false;


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
  createRoom(socket: Socket, data: { n: number, userId: number }) {

    if (data.n === null || data.n === undefined || data.userId === null || data.userId === undefined) {
      socket.emit('status', 'one of values is null or undefined');
      return;
    }
    this.firstUserId = data.userId;
    const roomId: string = this.RandomRoom();
    socket.join(roomId);
    this.rooms.set(roomId, new Room(socket.id, data.n));

    socket.emit('getRoomId', roomId);
    // this.io.emit("createNewGame", { roomId: roomId });
  }

  @SubscribeMessage("joinRoom")
  joinRoom(socket: Socket, data: { roomId: string, userId: number }) {
    if (data.roomId === null || data.roomId === undefined || data.userId === null || data.userId === undefined) {
      socket.emit('status', 'one of values is null or undefined');
      return;
    }
    this.secondUserId = data.userId;
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
  async handleMove(socket: Socket, data: { moveFrom: { x: number, y: number }, moveTo: { x: number, y: number } }) {
    let roomId;
    if (Array.from(socket.rooms)[0] === socket.id) {
      roomId = Array.from(socket.rooms)[1];
    } else {
      roomId = Array.from(socket.rooms)[0];
    }
    const room = this.rooms.get(roomId);
    if (room) {
      const move = room.makeMove(data.moveFrom, data.moveTo);

      if (move === "Success") {

        this.gameMoves.push({
          from: data.moveFrom,
          to: data.moveTo
        })
        console.log("Moves: ", this.gameMoves)
        this.io.to(roomId).emit("move", { from: data.moveFrom, to: data.moveTo });
      }
      else if (move === "Game is over" && !this.isGameAlreadyInDatabase) {
        this.gameMoves.push({
          from: data.moveFrom,
          to: data.moveTo
        })
        this.isGameAlreadyInDatabase = true;
        await this.prismaService.game.create({
          data:
          {

            users: {
              connect: [
                { id: this.firstUserId },
                { id: this.secondUserId }
              ]
            },
            Move: {
              create: this.gameMoves.map(move => ({
                fromX: move.from.x,
                fromY: move.from.y,
                toX: move.to.x,
                toY: move.to.y
              })),
            },
          },

        }).then((res) => console.log("Ok", res)).catch(res => console.log("Error prisma", res));
        this.io.to(roomId).emit("move", "End of the game");
      }
      else {
        this.io.to(roomId).emit("move", "Incorrect move");
      }
    } else {
      this.io.emit("move status", "No room with this roomId");
      throw new NotFoundException();
    }
  }

  @SubscribeMessage("end game")
  async handleEndOfTheGame(data: { roomId; player1; player2 }) {
    this.io.socketsLeave(data.roomId);
    const user1 = await this.prismaService.user.findUnique({
      where: { login: data.player1 },
    });
    const user2 = await this.prismaService.user.findUnique({
      where: { login: data.player2 },
    });

    // return await this.prismaService.game.create({
    //   data: {
    //     moves: this.gameMoves,
    //     users: { connect: [{ id: user1.id }, { id: user2.id }] },
    //   },
    // });
  }

  handleDisconnect(client: Socket) {

    this.io.to(this.rooms[client.id]).emit('status', "Client disconnected: ", client.id)
    console.log("Event disconnect ");
  }
}
