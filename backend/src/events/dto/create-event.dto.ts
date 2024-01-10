import { IsNotEmpty } from "@nestjs/class-validator";

export class CreateEventDto {
  @IsNotEmpty()

  game: string[];
}
