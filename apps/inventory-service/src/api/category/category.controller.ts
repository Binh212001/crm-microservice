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

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async create(
    @Body(ValidationPipe) createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return await this.categoryService.create(createCategoryDto);
  }

  @Get()
  async findAll(): Promise<Category[]> {
    return await this.categoryService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Category> {
    return await this.categoryService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    return await this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ message: string }> {
    await this.categoryService.remove(id);
    return { message: 'Category deleted successfully' };
  }
}
