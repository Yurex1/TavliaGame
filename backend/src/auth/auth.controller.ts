import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  HttpCode,
  HttpStatus,
  UseGuards,
  Res,
  Req,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateAuthDto } from "./dto/create-user.dto";
import { UpdateAuthDto } from "./dto/update-auth.dto";
import { AuthGuard } from "./auth.guard";
import { Request, Response } from "express";
import { SignInDto } from "../auth/dto/login-user.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @HttpCode(HttpStatus.OK)
  @Post("login")
  async signIn(@Body() signInDto: SignInDto, @Res() res: Response) {
    try {
      await this.authService.signIn(
        {
          username: signInDto.username,
          pass: signInDto.password,
        },
        res
      ).then((result) => {

        res.json(result);
      });
    } catch (error) {
      if (error.status === 401) {
        res
          .status(HttpStatus.UNAUTHORIZED)
          .json({ message: "Incorrect username or password" });
      }
      else if (error.status === 400) {
        res.status(HttpStatus.BAD_REQUEST).json({ message: "username or password is undefined" })
      }
      else {
        res.status(HttpStatus.SEE_OTHER).json({ message: "Error occured" })
      }
    }
  }

  @Post()
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.createUser(createAuthDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get("profile")
  getProfile(@Req() req: Request, @Body() id: number) {
    return this.authService.findOne(id)
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.authService.findOne(+id);
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.authService.remove(+id);
  }
}
