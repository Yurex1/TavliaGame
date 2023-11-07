import { AuthService } from "./auth.service";
import { CreateAuthDto } from "./dto/create-user.dto";
import { UpdateAuthDto } from "./dto/update-auth.dto";
import { Response } from "express";
import { SignInDto } from "../auth/dto/login-user.dto";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signIn(signInDto: SignInDto, res: Response): Promise<void>;
    create(createAuthDto: CreateAuthDto): Promise<string | {
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
    getProfile(req: any): any;
    findOne(id: string): Promise<string | {
        id: number;
        login: string;
        password: string;
        email: string;
        name: string;
    }>;
    update(id: string, updateAuthDto: UpdateAuthDto): Promise<string>;
    remove(id: string): Promise<string>;
}
