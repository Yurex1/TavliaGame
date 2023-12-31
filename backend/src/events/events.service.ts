import { Injectable } from "@nestjs/common";
import { CreateEventDto } from "./dto/create-event.dto";
import { UpdateEventDto } from "./dto/update-event.dto";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class EventsService {
  constructor(private prismaService: PrismaService) { }

  create(createEventDto: CreateEventDto) {
    return "This action adds a new event";
  }

  findAll() {
    return `This action returns all events`;
  }

  findOne(id: number) {
    return `This action returns a #${id} event`;
  }

  update(id: number, updateEventDto: UpdateEventDto) {
    return `This action updates a #${id} event`;
  }

  remove(id: number) {
    return `This action removes a #${id} event`;
  }
  async getAllGames(id: number) {
    return await this.prismaService.user.findUnique({ where: { id }, include: { games: { include: { Move: true, users: true } }, } });
  }

}
