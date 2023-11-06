import { CreateEventDto } from "./dto/create-event.dto";
import { UpdateEventDto } from "./dto/update-event.dto";
import { PrismaService } from "src/prisma.service";
export declare class EventsService {
    private prismaService;
    constructor(prismaService: PrismaService);
    create(createEventDto: CreateEventDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateEventDto: UpdateEventDto): string;
    remove(id: number): string;
}
