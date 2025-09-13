import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsOptional } from 'class-validator';
import { UserStatus } from '../enums/user-status';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsEnum(UserStatus)
  status: UserStatus;
}
