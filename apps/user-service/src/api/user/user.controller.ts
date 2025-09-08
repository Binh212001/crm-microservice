import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto, UserReqDto, UserResDto } from './dto';
import { User } from './entities/user.entity';
import { PaginationResponse } from '../../comom/pagination/pagination';
import { UpdateDeleteResDto } from '../../comom/response/update-delete-res.dto';
import { RoleEnum } from './enums/role';
import { Role } from 'apps/libs/decorators/role.decorator';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Role(RoleEnum.ADMIN)
  @Post()
  async create(
    @Body(ValidationPipe) createCategoryDto: CreateUserDto,
  ): Promise<User> {
    return await this.userService.create(createCategoryDto);
  }

  @Role(RoleEnum.ADMIN)
  @Get()
  async findAll(
    @Query() userReqDto: UserReqDto,
  ): Promise<PaginationResponse<UserResDto>> {
    return await this.userService.findAll(userReqDto);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<UserResDto> {
    return await this.userService.findOne(id);
  }
  @Role(RoleEnum.ADMIN)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateCategoryDto: UpdateUserDto,
  ): Promise<UpdateDeleteResDto> {
    return await this.userService.update(id, updateCategoryDto);
  }

  @Role(RoleEnum.ADMIN)
  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UpdateDeleteResDto> {
    return await this.userService.remove(id);
  }
}
