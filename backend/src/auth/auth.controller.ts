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

  @Get('findAll')
  findAll() {
    return this.authService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get("profile")
  getProfile(@Req() req: Request) {
    //@ts-ignore
    return req.user
  }

  @UseGuards(AuthGuard)
  @Put('friends')
  addFriend(@Req() req: Request, @Body("id") id: number, @Res() res: Response) {
    //@ts-ignore
    return this.authService.addFriend(req.user.sub, id, res)
  }

  @UseGuards(AuthGuard)
  @Delete('friends')
  removeFriend(@Req() req: Request, @Body("id") id: number, @Res() res: Response) {

    //@ts-ignore
    return this.authService.removeFriend(req.user.sub, id, res)
  }

  @UseGuards(AuthGuard)
  @Get('friends')
  async getAllFriends(@Req() req: Request, @Res() res: Response) {
    //@ts-ignore
    return (await this.authService.getAllFriends(req.user.sub, res));
  }

  @UseGuards(AuthGuard)
  @Get(":id")
  async findOne(@Param("id") id: string) {
    return await this.authService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Put('user-update')
  update(@Req() req: Request, @Body() updateAuthDto: UpdateAuthDto) {
    //@ts-ignore
    const user: number = req.user.sub;
    return this.authService.update(user, updateAuthDto);
  }

  @UseGuards(AuthGuard)
  @Delete("user-delete")
  remove(@Req() req: Request) {
    //@ts-ignore
    const id: number = req.user.sub;
    return this.authService.remove(id);
  }


}
