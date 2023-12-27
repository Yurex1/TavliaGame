import { Module } from "@nestjs/common";
import { EventsService } from "./events.service";
import { EventsGateway } from "./events.gateway";
import { PrismaService } from "src/prisma.service";
import { EventsController } from "./events.controller";

@Module({
  controllers: [EventsController],
  providers: [EventsGateway, EventsService, PrismaService],
})
export class EventsModule {}
