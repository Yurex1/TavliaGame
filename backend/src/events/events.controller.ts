// app.controller.ts
import { Controller, Post, Body, Get, Req, UseGuards } from "@nestjs/common";
import { EventsGateway } from "./events.gateway";
import { EventsService } from "./events.service";
import { AuthGuard } from "src/auth/auth.guard";

@Controller('events')
export class EventsController {
  constructor(private readonly eventGateway: EventsGateway, private readonly eventsService: EventsService) { }

  @UseGuards(AuthGuard)
  @Get('allGames')
  getAllGames(@Req() req: Request) {
    //@ts-ignore
    return this.eventsService.getAllGames(req.user.sub);
  }
}
