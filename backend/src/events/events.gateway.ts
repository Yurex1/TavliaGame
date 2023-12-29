import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  WsResponse,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from "@nestjs/websockets";
import { Logger, NotFoundException, UnauthorizedException, UseGuards } from "@nestjs/common";
import { EventsService } from "./events.service";
import { CreateEventDto } from "./dto/create-event.dto";
import { UpdateEventDto } from "./dto/update-event.dto";
import { Socket, Namespace, Server } from "socket.io";
import { io } from "socket.io-client";
import { PrismaService } from "src/prisma.service";
import { Room } from "src/chess/room/room";
import { AuthGuard } from "src/auth/auth.guard";
import { JwtService } from "@nestjs/jwt";
import { jwtConstants } from '../auth/constants';
import { PrismaClientRustPanicError } from "@prisma/client/runtime/library";



@WebSocketGateway({
  cors:{
    origin: '*',
  },
  namespace: "events",
})
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private jwtService: JwtService,
    private readonly eventsService: EventsService,
    private prismaService: PrismaService
  ) { }

  @WebSocketServer() io: Namespace;
  private logger = new Logger();

  private rooms: Map<string, Room> = new Map();
  private players: Map<number, string> = new Map();
  // private firstUserId: number | null = null;
  // private secondUserId: number | null = null;
  // private isGameAlreadyInDatabase: boolean = false;


  RandomRoom = (): string => {
    let x: string = "";
    for (let i = 0; i < 22; i++) {
      x += String.fromCharCode(Math.random() * (90 - 65) + 65);
    }
    return x;
  };

  async handleConnection(socket: Socket) {
    const token = this.extractTokenFromHeader(socket.handshake);
    if (!token) {
      throw new UnauthorizedException();
    }


    const user = await this.jwtService.verifyAsync(
      token,
      {
        secret: jwtConstants.secret
      }
    );
    socket['user'] = user;
    const userId = user.sub

    if (this.players.has(userId)) {

      const roomId = this.players.get(userId);
      const room = this.rooms.get(roomId);
      socket.join(roomId);
      socket.emit('inGame', {
        roomId,
        board: room.gameManager.gameBoard.cells,
        youMove: room.playerMoves(userId)
      })
    }
  }

  private extractTokenFromHeader(request: typeof Socket.prototype.handshake): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  @SubscribeMessage("createRoom")
  async createRoom(socket: Socket, data: { n: number, userId: number }) {

    if (data.n === null || data.n === undefined || data.userId === null || data.userId === undefined) {
      socket.emit('status', 'one of values is null or undefined');
      return;
    }
    const user = await this.prismaService.user.findUnique({ where: { id: data.userId } })
    if (!user) {
      socket.emit('status', 'no user with this id');
      return;
    }
    // this.firstUserId = data.userId;
    const roomId: string = this.RandomRoom();
    socket.join(roomId);
    const room = new Room(user.id, data.n, this.prismaService);
    this.rooms.set(roomId, room);
    this.players.set(user.id, roomId)

    socket.emit('getRoomId', roomId);
    // this.io.emit("createNewGame", { roomId: roomId });
  }


  @SubscribeMessage("joinRoom")
  async joinRoom(socket: Socket, data: { roomId: string, userId: number }) {
    if (data.roomId === null || data.roomId === undefined || data.userId === null || data.userId === undefined) {
      socket.emit('status', 'one of values is null or undefined');
      return;
    }
    const user = await this.prismaService.user.findUnique({ where: { id: data.userId } })
    if (!user) {
      socket.emit('status', 'no user with this id');
      return;
    }
    // this.secondUserId = data.userId;
    const room = this.rooms.get(data.roomId);
    if (!room) {
      socket.emit("status", "No room with this roomId");
      return;
    } else if (room.size >= 2) {
      socket.emit("status", "This room already has 2 players");
      return;
    }
    socket.join(data.roomId);
    room.addPlayer(user.id);
    this.players.set(user.id, data.roomId);
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
    if (!room) {
      this.io.emit("status", "No room with this roomId");
      throw new NotFoundException();
    }

    const move = room.makeMove(data.moveFrom, data.moveTo);
    if (move === "Success") {
      this.io.to(roomId).emit("move", { from: data.moveFrom, to: data.moveTo });
    }
    else if (move === "Game is over") {
      room.saveGame();
      this.io.to(roomId).emit("move", "End of the game");
      this.io.socketsLeave(roomId);
      this.rooms.delete(roomId)
      this.players.delete(room.player1);
      this.players.delete(room.player2);

    }
    else {
      socket.emit('move', "Incorrect move")

    }
  }

  handleDisconnect(client: Socket) {
    this.io.to(this.rooms[client.id]).emit('status', "Client disconnected: ", client.id)
    console.log("Event disconnect ");
  }
}