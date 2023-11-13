import { AuthService } from "./auth.service";
import { CreateAuthDto } from "./dto/create-user.dto";
import { UpdateAuthDto } from "./dto/update-auth.dto";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signIn(signInDto: Record<string, any>): Promise<{
        access_token: string;
    }>;
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
