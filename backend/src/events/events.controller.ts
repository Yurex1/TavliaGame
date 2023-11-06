// app.controller.ts
import { Controller, Post, Body } from "@nestjs/common";
import { EventsGateway } from "./events.gateway";

@Controller()
export class EventsController {
  constructor(private readonly eventGateway: EventsGateway) {}
}
