import { UpdateAuthDto } from "./dto/update-auth.dto";
import { PrismaService } from "src/prisma.service";
import { Prisma } from "@prisma/client";
import { JwtService } from "@nestjs/jwt";
export declare class AuthService {
    private prismaService;
    private jwtService;
    constructor(prismaService: PrismaService, jwtService: JwtService);
    signIn(username: any, pass: any): Promise<{
        access_token: string;
    }>;
    createUser(data: Prisma.UserCreateInput): Promise<string | {
        id: number;
        login: string;
        password: string;
        email: string;
        name: string;
    }>;
    findAll(): Promise<{
        id: number;
        login: string;
        password: string;
        email: string;
        name: string;
    }[]>;
    findOne(id: number): Promise<string | {
        id: number;
        login: string;
        password: string;
        email: string;
        name: string;
    }>;
    update(id: number, updateAuthDto: UpdateAuthDto): Promise<string>;
    remove(id: number): Promise<string>;
}
