// import { Injectable, NotFoundException } from '@nestjs/common';
// import { CreateProductDto } from './dto/create-variant.dto';
// import { UpdateProductDto } from './dto/update-variant.dto';
// import { Product } from './entities/attribute.entity';
// import { ProductRepository } from './variant.repository';

// @Injectable()
// export class ProductService {
//   constructor(private productRepository: ProductRepository) {}

//   async create(createCategoryDto: CreateProductDto): Promise<Product> {
//     const product = this.productRepository.create(createCategoryDto);
//     return await this.productRepository.save(product);
//   }

//   async findAll(): Promise<Product[]> {
//     return await this.productRepository.find();
//   }

//   async findOne(id: number): Promise<Product> {
//     const category = await this.productRepository.findOne({ where: { id } });
//     if (!category) {
//       throw new NotFoundException(`Category with ID ${id} not found`);
//     }
//     return category;
//   }

//   async update(
//     id: number,
//     updateCategoryDto: UpdateProductDto,
//   ): Promise<Product> {
//     const category = await this.findOne(id);
//     Object.assign(category, updateCategoryDto);
//     return await this.productRepository.save(category);
//   }

//   async remove(id: number): Promise<void> {
//     const category = await this.findOne(id);
//     await this.productRepository.remove(category);
//   }
// }
