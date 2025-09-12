import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';
import { CategoryRepository } from './category.repository';
import { plainToInstance } from 'class-transformer';
import {
  pagination,
  PaginationResponse,
} from 'apps/order-service/src/comom/pagination/pagination';
import { ProductResDto } from '../product/dto/product-res.dto';
import { CategoryResDto } from './dto/category-res.dto';
import { CategoryReqDto } from './dto/category-req.dto';

@Injectable()
export class CategoryService {
  constructor(private categoryRepository: CategoryRepository) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const category = this.categoryRepository.create(createCategoryDto);
    return await this.categoryRepository.save(category);
  }

  async findAll(
    dto: CategoryReqDto,
  ): Promise<PaginationResponse<CategoryResDto>> {
    const { page, limit, order, name } = dto;
    const where: FindOptionsWhere<Category> = {};
    if (name) {
      where.name = Like(`%${name}%`);
    }

    const { data, total } = await pagination({
      page,
      limit,
      repository: this.categoryRepository,
      order: order ? { [order]: 'DESC' } : { createdAt: 'DESC' },
      where,
    });
    return plainToInstance(PaginationResponse<CategoryResDto>, {
      page: page ?? 1,
      limit: limit ?? 20,

      total,
      data: plainToInstance(ProductResDto, data),
    });
  }

  async findOne(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return category;
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const category = await this.findOne(id);
    Object.assign(category, updateCategoryDto);
    return await this.categoryRepository.save(category);
  }

  async remove(id: number): Promise<void> {
    const category = await this.findOne(id);
    await this.categoryRepository.remove(category);
  }
}
