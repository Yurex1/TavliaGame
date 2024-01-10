
import { IsBoolean, IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateAuthDto {

  @IsNotEmpty()
  @IsString()
  login: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
}
