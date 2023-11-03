import { Injectable, UnauthorizedException } from "@nestjs/common";
import { CreateAuthDto } from "./dto/create-user.dto";
import { UpdateAuthDto } from "./dto/update-auth.dto";
import { PrismaService } from "src/prisma.service";
import { User, Prisma } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService
  ) {}

  async signIn(username, pass) {
    // if (username === undefined || pass === undefined) {
    //   return "username of password is undefined";
    // }
    const user: User = await this.prismaService.user.findFirst({
      where: { login: username },
    });
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.login };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
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
        return this.prismaService.user.create({ data });
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
      .catch(() => {
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
}
