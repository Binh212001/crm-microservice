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
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';
import { Category } from './entities/category.entity';
import { Role } from 'apps/libs/decorators/role.decorator';
import { RoleEnum } from 'apps/user-service/src/api/user/enums/role';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Role(RoleEnum.ADMIN)
  @Post()
  async create(
    @Body(ValidationPipe) createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return await this.categoryService.create(createCategoryDto);
  }

  @Role(RoleEnum.ADMIN)
  @Get()
  async findAll(): Promise<Category[]> {
    return await this.categoryService.findAll();
  }

  @Role(RoleEnum.ADMIN)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Category> {
    return await this.categoryService.findOne(id);
  }

  @Role(RoleEnum.ADMIN)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    return await this.categoryService.update(id, updateCategoryDto);
  }

  @Role(RoleEnum.ADMIN)
  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ message: string }> {
    await this.categoryService.remove(id);
    return { message: 'Category deleted successfully' };
  }
}
