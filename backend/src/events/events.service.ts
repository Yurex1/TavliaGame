import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class EventsService {
  constructor(private prismaService: PrismaService) { }



  findAll() {
    return `This action returns all events`;
  }

  findOne(id: number) {
    return `This action returns a #${id} event`;
  }


  remove(id: number) {
    return `This action removes a #${id} event`;
  }
  async getAllGames(id: number) {
    return await this.prismaService.user.findUnique({ where: { id }, include: { games: { include: { Move: true, users: true } }, } });
  }

}
