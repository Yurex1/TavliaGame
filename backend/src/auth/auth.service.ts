import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { CreateAuthDto } from "./dto/create-user.dto";
import { UpdateAuthDto } from "./dto/update-auth.dto";
import { PrismaService } from "src/prisma.service";
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

  async signIn(data: { username, pass }, res: Response) {

    if (data.username === undefined || data.pass === undefined) {
      return res.status(400).json('Username or password is undefined');
    }

    const user: User | null = await this.prismaService.user.findFirst({
      where: { login: data.username },
    });
    console.log('user', user)
    if (user === null || !await bcrypt.compare(data.pass, user.password,)) {
      return res.status(401).json("No such user or incorrect password");
    }
    const payload = { sub: user.id, username: user.login };
    const access_token = await this.jwtService.signAsync(payload);

    return access_token;
  }

  async createUser(data: Prisma.UserCreateInput) {
    return this.prismaService.user
      .findFirstOrThrow({
        where: { OR: [{ login: data.login }, { email: data.email }] },
      })
      .then(() => {
        return "User with this login or email has already been created.";
      })
      .catch(async () => {
        const password = await bcrypt.hash(
          data.password,
          await bcrypt.genSalt()
        );

        data.password = password;

        return await this.prismaService.user.create({ data });
      });
  }

  async findAll() {
    return await this.prismaService.user.findMany();
  }

  async findOne(id: number) {
    return await this.prismaService.user
      .findFirstOrThrow({ where: { id: id } })
      .catch(() => `User with login: ${id} was not found`);
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

        return `Error occured while updating user`;
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
    try {
      const user = await this.prismaService.user.findUnique({ where: { id: id } });
      const friend = await this.prismaService.user.findUnique({ where: { id: friendsId } });
      if (!user || !friend) {
        return res.status(404).json("User was not found")
      }
      if (user.friends.includes(friendsId)) {
        return res.status(400).json("User is already your friend")
      }
      if (id === friendsId) {
        return res.status(400).json("You cannot add yourself as a friend")
      }


      const currentFriends = user.friends ?? [];

      const updatedUser = await this.prismaService.user.update({
        where: { id: id },
        data: {

          friends: [...currentFriends, friendsId],
        },
      });
      return res.status(200).json(updatedUser)

    }
    catch (error) {

      throw error;
    }
  }

  async removeFriend(id: number, friendsId: number, res: Response) {

    const user = await this.prismaService.user.findUnique({ where: { id: id } });
    if (!user) {
      return res.status(404).json("No user with this id");
    }
    if (!user.friends.includes(friendsId)) {
      return res.status(400).json("User doesn't have this friend");
    }

    const updatedFriendsList = user.friends.filter(friendId => friendId !== friendsId);


    await this.prismaService.user.update({
      where: { id: id },
      data: { friends: updatedFriendsList }
    });
    return res.status(200).json({ message: "Friend removed successfully" });
  }

  async getAllFriends(id: number, res: Response) {
    const user = await this.prismaService.user.findUnique({ where: { id: id } });
    if (!user) {
      return res.status(404).json("No user with this id");
    }

    return res.status(200).json(user.friends);
  }

}
