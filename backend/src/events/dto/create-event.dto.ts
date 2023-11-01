import { IsNotEmpty, IsString } from "@nestjs/class-validator";

export class CreateEventDto {
  @IsNotEmpty()
  game: string[];
}
