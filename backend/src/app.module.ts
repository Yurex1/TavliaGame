import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { EventsModule } from "./events/events.module";

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [AuthModule, EventsModule],
})
export class AppModule { }
