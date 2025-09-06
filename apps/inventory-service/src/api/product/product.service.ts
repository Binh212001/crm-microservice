import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { FindOptionsWhere, Like } from 'typeorm';
import {
  pagination,
  PaginationResponse,
} from '../../comom/pagination/pagination';
import { UpdateDeleteResDto } from '../../comom/response/update-delete-res.dto';
import { CategoryService } from '../category/category.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductReqDto } from './dto/product-req.dto';
import { ProductResDto } from './dto/product-res.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
  constructor(
    private productRepository: ProductRepository,
    private categoryService: CategoryService,
  ) {}

  async create(createCategoryDto: CreateProductDto): Promise<Product> {
    const category = await this.categoryService.findOne(
      createCategoryDto.categoryId,
    );
    if (!category) {
      throw new NotFoundException(
        `Category with ID ${createCategoryDto.categoryId} not found`,
      );
    }
    const product = this.productRepository.create({
      ...createCategoryDto,
      category: category,
    });
    return await this.productRepository.save(product);
  }

  async findAll(
    productReqDto: ProductReqDto,
  ): Promise<PaginationResponse<ProductResDto>> {
    const { page, limit, order, name, sku, barcode, categoryId } =
      productReqDto;
    const where: FindOptionsWhere<Product> = {};
    if (name) {
      where.name = Like(`%${name}%`);
    }

    if (categoryId) {
      where.category = { id: Number(categoryId) };
    }

    const { data, total } = await pagination({
      page,
      limit,
      repository: this.productRepository,
      order: order ? { [order]: 'DESC' } : { createdAt: 'DESC' },
      where,
    });
    return plainToInstance(PaginationResponse<ProductResDto>, {
      page: page ?? 1,
      limit: limit ?? 20,
      total,
      data: plainToInstance(ProductResDto, data),
    });
  }

  async findOne(id: number): Promise<ProductResDto> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return plainToInstance(ProductResDto, product);
  }

  async update(
    id: number,
    updateCategoryDto: UpdateProductDto,
  ): Promise<UpdateDeleteResDto> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    Object.assign(product, {
      ...updateCategoryDto,
    });
    if (updateCategoryDto.categoryId) {
      const category = await this.categoryService.findOne(
        updateCategoryDto.categoryId,
      );
      if (!category) {
        throw new NotFoundException(
          `Category with ID ${updateCategoryDto.categoryId} not found`,
        );
      }
      product.category = category;
    }

    const savedProduct = await this.productRepository.save(product);
    return plainToInstance(UpdateDeleteResDto, { id: savedProduct.id });
  }

  async remove(id: number): Promise<UpdateDeleteResDto> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    await this.productRepository.remove(product);
    return plainToInstance(UpdateDeleteResDto, { id: product.id });
  }
}
