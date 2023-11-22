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
      );
      res.json("Success login");
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Error occurred" });
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
  getProfile(@Req() req: Request) {
    //@ts-ignore
    return req.user;
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
