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

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(
    @Body(ValidationPipe) createCategoryDto: CreateUserDto,
  ): Promise<User> {
    return await this.userService.create(createCategoryDto);
  }

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

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateCategoryDto: UpdateUserDto,
  ): Promise<UpdateDeleteResDto> {
    return await this.userService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UpdateDeleteResDto> {
    return await this.userService.remove(id);
  }
}
