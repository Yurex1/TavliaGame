import { Injectable } from "@nestjs/common";
import { CreateAuthDto } from "./dto/create-user.dto";
import { UpdateAuthDto } from "./dto/update-auth.dto";
import { PrismaService } from "src/prisma.service";
import { User, Prisma } from "@prisma/client";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}

  async createUser(data: Prisma.UserCreateInput) {
    return this.prismaService.user
      .findFirstOrThrow({
        where: { login: data.login },
      })
      .then(() => {
        return "User with this login or email has already been created.";
      })
      .catch(async () => {
        const password = bcrypt.hash(data.password, await bcrypt.genSalt());
        return this.prismaService.user.create({
          data,
        });
      });
  }

  async findAll() {
    return await this.prismaService.user.findMany();
  }

  async findOne(id: number) {
    return await this.prismaService.user
      .findFirstOrThrow({ where: { id: id } })
      .catch(() => `User with id: ${id} was not found`);
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
