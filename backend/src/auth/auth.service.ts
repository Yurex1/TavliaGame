import {
  HttpStatus,
  Injectable,
} from "@nestjs/common";

import { UpdateAuthDto } from "./dto/update-auth.dto";
import { PrismaService } from "../prisma.service";
import { User, Prisma } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { Response } from "express";

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService
  ) { }

  async signIn(data: { login, pass }, res: Response) {
    if (data.login === undefined || data.pass === undefined) {
      return res.status(HttpStatus.BAD_REQUEST).json('Login or password is undefined');
    }
    const user: User | null = await this.prismaService.user.findFirst({
      where: { login: data.login },
    });
    if (user === null || !await bcrypt.compare(data.pass, user.password,)) {
      return res.status(HttpStatus.UNAUTHORIZED).json("No such user or incorrect password");
    }
    const payload = { sub: user.id, login: user.login };
    const access_token = await this.jwtService.signAsync(payload);
    res.json(access_token)
    // return access_token;
  }

  async createUser(data: Prisma.UserCreateInput, res: Response) {
    try {
      const newUser = await this.prismaService.user.findFirst({
        where: {
          OR: [{ email: data.email }, { login: data.login }]
        }
      });
      if (newUser) {
        res.status(HttpStatus.CONFLICT).json('User with the same login/email has already been created');
        return;
      }
      const password = await bcrypt.hash(
        data.password,
        await bcrypt.genSalt()
      );
      data.password = password;
      const user = await this.prismaService.user.create({ data });
      res.json(user);
    }
    catch {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json('Internal Server Error')
    }
  }

  async findAll() {
    return await this.prismaService.user.findMany();
  }

  async findOne(id: number) {
    return await this.prismaService.user
      .findFirstOrThrow({ where: { id: id } })
      .catch(() => `User with login: ${id} was not found`);
  }

  async getAllRanks() {
    const allUsers = await this.prismaService.user.findMany();
    return allUsers.map((el) => {
      return ({ login: el.login, rank: el.rank })
    });
  }

  async update(id: number, updateAuthDto: UpdateAuthDto) {
    return await this.prismaService.user
      .update({
        where: { id: id },
        data: updateAuthDto,
      })
      .then(() => {
        return `User successfully updated`;
      })
      .catch((err) => {
        return `Error occured while updating user ${err}`;
      });
  }

  async remove(id: number) {
    return await this.prismaService.user
      .delete({ where: { id: id } })
      .then(() => {
        return "User was successfully deleted";
      })
      .catch(() => {
        return `No user with id: ${id}`;
      });
  }

  async addFriend(id: number, friendsId: number, res: Response) {

    const user = await this.prismaService.user.findUnique({ where: { id: id } });
    const friend = await this.prismaService.user.findUnique({ where: { id: friendsId } });
    if (!user || !friend) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: "User was not found" })
    }
    if (user.friends.includes(friendsId)) {
      return res.status(HttpStatus.CONFLICT).json({ message: "User is already your friend" })
    }
    if (id === friendsId) {
      return res.status(HttpStatus.CONFLICT).json({ message: "You cannot add yourself as a friend" })
    }
    const currentFriends = user.friends ?? [];
    const updatedUser = await this.prismaService.user.update({
      where: { id: id },
      data: {

        friends: [...currentFriends, friendsId],
      },
    });
    return res.status(HttpStatus.OK).json(updatedUser)
  }



  async removeFriend(id: number, friendsId: number, res: Response) {
    const user = await this.prismaService.user.findUnique({ where: { id: id } });
    if (!user) {
      return res.status(HttpStatus.BAD_REQUEST).json("No user with this id");
    }
    if (!user.friends.includes(friendsId)) {
      return res.status(HttpStatus.BAD_REQUEST).json("User doesn't have this friend");
    }
    const updatedFriendsList = user.friends.filter(friendId => friendId !== friendsId);
    await this.prismaService.user.update({
      where: { id: id },
      data: { friends: updatedFriendsList }
    });
    return res.status(HttpStatus.OK).json({ message: "Friend removed successfully" });
  }

  async getAllFriends(id: number, res: Response) {
    const user = await this.prismaService.user.findUnique({ where: { id: id } });
    if (!user) {
      return res.status(HttpStatus.BAD_REQUEST).json("No user with this id");
    }
    return res.status(HttpStatus.ACCEPTED).json(user.friends);
  }

}
