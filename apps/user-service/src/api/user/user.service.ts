import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { UpdateDeleteResDto } from '../../comom/response/update-delete-res.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';
import { FindOptionsWhere, Like } from 'typeorm';
import {
  pagination,
  PaginationResponse,
} from '../../comom/pagination/pagination';
import { UserResDto } from './dto/user-res.dto';
import { UserReqDto } from './dto';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async create(dto: CreateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email: dto.email },
    });
    if (!user) {
      throw new NotFoundException(`User with email ${dto.email} not found`);
    }
    const newUser = this.userRepository.create({
      ...dto,
    });
    //handle save product variants
    return await this.userRepository.save(newUser);
  }

  async findAll(
    userReqDto: UserReqDto,
  ): Promise<PaginationResponse<UserResDto>> {
    const { page, limit, order, name, email } = userReqDto;
    const where: FindOptionsWhere<User> = {};
    if (name) {
      where.name = Like(`%${name}%`);
    }

    if (email) {
      where.email = Like(`%${email}%`);
    }

    const { data, total } = await pagination({
      page,
      limit,
      repository: this.userRepository,
      order: order ? { [order]: 'DESC' } : { createdAt: 'DESC' },
      where,
    });
    return plainToInstance(PaginationResponse<UserResDto>, {
      page: page ?? 1,
      limit: limit ?? 20,
      total,
      data: plainToInstance(UserResDto, data),
    });
  }

  async findOne(id: number): Promise<UserResDto> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return plainToInstance(UserResDto, user);
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateDeleteResDto> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    Object.assign(user, {
      ...updateUserDto,
    });

    const savedUser = await this.userRepository.save(user);
    return plainToInstance(UpdateDeleteResDto, { id: savedUser.id });
  }

  async remove(id: number): Promise<UpdateDeleteResDto> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    await this.userRepository.remove(user);
    return plainToInstance(UpdateDeleteResDto, { id: user.id });
  }
}
