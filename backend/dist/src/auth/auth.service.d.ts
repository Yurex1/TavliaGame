import { UpdateAuthDto } from "./dto/update-auth.dto";
import { PrismaService } from "src/prisma.service";
import { Prisma } from "@prisma/client";
export declare class AuthService {
    private prismaService;
    constructor(prismaService: PrismaService);
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
    findOne(id: number): string;
    update(id: number, updateAuthDto: UpdateAuthDto): string;
    remove(id: number): Promise<string>;
}
