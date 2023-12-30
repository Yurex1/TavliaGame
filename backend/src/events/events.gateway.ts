import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  WsResponse,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WsException,
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
    let user;
    try {
      user = await this.jwtService.verifyAsync(
        token,
        {
          secret: jwtConstants.secret
        }
      );
      socket['user'] = user;
    } catch {
      socket.emit('status', 'token expired')
      socket.disconnect();
      return;
    }
    socket['user'] = user;
    const userId = user.sub

    if (this.players.has(userId)) {

      const roomId = this.players.get(userId);
      const room = this.rooms.get(roomId);
      socket.join(roomId);
      socket.emit('inGame', {
        roomId,
        board: room.gameManager.gameBoard.cells,
        youMove: room.youMove(userId),
        playerMove: room.playerMove(),
        history: room.gameMoves,
      })
    }
  }

  private extractTokenFromHeader(request: typeof Socket.prototype.handshake): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  @SubscribeMessage('getInfoRoom')
  getInfoRoom(socket: Socket, data: { roomId: string }) {
    const room = this.rooms.get(data.roomId);
    if (!room) {
      socket.emit('info', 'no room with this roomId')
      return;
    }
    this.io.to(data.roomId).emit('info', {
      'history': room.gameMoves,
      'firstPlayer': room.player1,
      'secondPlayer': room.player2
    })
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
    if (this.players.has(user.id)) {
      socket.emit('status', 'Can\'t join when previous game is not ended');
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
    if (move.result === "OK") {
      this.io.to(roomId).emit("move", { from: data.moveFrom, to: data.moveTo, die: move.die });
    }
    else if (move.result === "END GAME") {
      room.saveGame();
      this.io.to(roomId).emit("move", "End of the game");
      this.io.socketsLeave(roomId);
      this.rooms.delete(roomId)
      this.players.delete(room.player1);
      this.players.delete(room.player2);
    }
    else if (move.result === 'WRONG') {
      socket.emit('move', "Incorrect move")
    }
  }

  @SubscribeMessage('surrender')
  async surrender(socket: Socket) {
    let roomId;
    if (Array.from(socket.rooms)[0] === socket.id) {
      roomId = Array.from(socket.rooms)[1];
    } else {
      roomId = Array.from(socket.rooms)[0];
    }
    const userId = socket['user'];
    const room = this.rooms.get(roomId);
    if (!room) {
      this.io.emit("status", "No room with this roomId");
      throw new NotFoundException();
    }
    if (!this.players.has(userId)) {
      socket.emit('status', 'This user is not in the game')
    }
    room.surrender(userId)
    this.io.to(roomId).emit("move", "Player surrendered");
    this.io.socketsLeave(roomId);
    this.rooms.delete(roomId)
    this.players.delete(room.player1);
    this.players.delete(room.player2);
  }

  handleDisconnect(client: Socket) {
    this.io.to(this.rooms[client.id]).emit('status', "Client disconnected: ", client.id)
    const userId = client['user']?.sub;
    if (this.players.has(userId)) {
      let roomId;
      if (Array.from(client.rooms)[0] === client.id) {
        roomId = Array.from(client.rooms)[1];
      } else {
        roomId = Array.from(client.rooms)[0];
      }
      const room = this.rooms.get(roomId);
      const result = room.removePlayer(userId)
      if (result === '1 player left') {

      }
      else if (result === '0 players left') {
        room.surrender(room.firstLogout)
        this.io.to(roomId).emit("move", `Player ${room.firstLogout} surrendered`);
        this.io.socketsLeave(roomId);
        this.rooms.delete(roomId)
        this.players.delete(room.player1);
        this.players.delete(room.player2);
      }
    }
    console.log("Event disconnect ");
  }
}