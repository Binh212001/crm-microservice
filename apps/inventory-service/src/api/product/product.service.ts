import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { FindOptionsWhere, In, Like } from 'typeorm';
import {
  pagination,
  PaginationResponse,
} from '../../comom/pagination/pagination';
import { UpdateDeleteResDto } from '../../comom/response/update-delete-res.dto';
import { CategoryService } from '../category/category.service';
import { AttributeRepository } from '../variant/repositories/attribute.repository';
import { ValueRepository } from '../variant/repositories/value.repository';
import {
  CreateProductDto,
  CreateProductVariantDto,
} from './dto/create-product.dto';
import { ProductReqDto } from './dto/product-req.dto';
import { ProductResDto } from './dto/product-res.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductVariant } from './entities/product-variant.entity';
import { Product } from './entities/product.entity';
import { ProductVariantRepository } from './repositories/product-variant.repository';
import { ProductRepository } from './repositories/product.repository';

@Injectable()
export class ProductService {
  constructor(
    private productRepository: ProductRepository,
    private categoryService: CategoryService,
    private productVariantRepository: ProductVariantRepository,
    private attributeRepository: AttributeRepository,
    private valueRepository: ValueRepository,
  ) {}

  async create(dto: CreateProductDto): Promise<Product> {
    const { categoryId, variants, ...productDto } = dto;
    const category = await this.categoryService.findOne(dto.categoryId);
    if (!category) {
      throw new NotFoundException(`Category with ID ${categoryId} not found`);
    }
    const product = this.productRepository.create({
      ...productDto,
      category: category,
    });
    //handle save product variants
    const productVariants = await this.createProductVariant(variants, product);
    await this.productVariantRepository.save(productVariants);
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

  async createProductVariant(
    dto: CreateProductVariantDto[],
    product: Product,
  ): Promise<ProductVariant[]> {
    const productVariants = await Promise.all(
      dto.map(async (variant: CreateProductVariantDto) => {
        const attribute = await this.attributeRepository.findOne({
          where: { id: variant.attributeId },
        });
        if (!attribute) {
          throw new NotFoundException(
            `Attribute with ID ${variant.attributeId} not found`,
          );
        }
        const values = await this.valueRepository.find({
          where: {
            id: In(variant.valueIds),
          },
        });
        if (
          !values ||
          values.length === 0 ||
          values.length !== variant.valueIds.length
        ) {
          throw new NotFoundException(
            `Values with IDs ${variant.valueIds} not found`,
          );
        }
        return this.productVariantRepository.create({
          attribute: attribute,
          values: values,
          product: product,
        });
      }),
    );
    return productVariants;
  }

  async findByIds(ids: number[]): Promise<ProductResDto[]> {
    const products = await this.productRepository.find({
      where: { id: In(ids) },
    });
    return plainToInstance(ProductResDto, products);
  }

  async findOneById(id: number): Promise<ProductResDto | null> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      return null;
    }

    return plainToInstance(ProductResDto, product);
  }
}
