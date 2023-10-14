import { AuthService } from "./auth.service";
import { CreateAuthDto } from "./dto/create-user.dto";
import { UpdateAuthDto } from "./dto/update-auth.dto";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
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
    findOne(id: string): string;
    update(id: string, updateAuthDto: UpdateAuthDto): string;
    remove(id: string): Promise<string>;
}
