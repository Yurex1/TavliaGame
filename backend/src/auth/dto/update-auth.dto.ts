import { PartialType, OmitType } from '@nestjs/mapped-types';
import { CreateAuthDto } from './create-user.dto';

export class UpdateAuthDto extends PartialType(
    OmitType(CreateAuthDto, ['email', 'login'] as const)
) { }
