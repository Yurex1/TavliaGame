
import { IsEmail, IsNotEmpty, IsString, Min } from "class-validator";

export class CreateAuthDto {

  @IsNotEmpty()
  @IsString()
  login: string;

  @IsNotEmpty()
  @IsString()
  @Min(8)
  password: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
}
