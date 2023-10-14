"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async createUser(data) {
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
    async findOne(id) {
        return await this.prismaService.user
            .findFirstOrThrow({ where: { id: id } })
            .catch(() => `User with id: ${id} was not found`);
    }
    async update(id, updateAuthDto) {
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
    async remove(id) {
        return await this.prismaService.user
            .delete({ where: { id: id } })
            .then(() => {
            return "User was successfully deleted";
        })
            .catch(() => {
            return `No user with id: ${id}`;
        });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AuthService);
//# sourceMappingURL=auth.service.js.map