// import {
//   Controller,
//   Get,
//   Post,
//   Body,
//   Patch,
//   Param,
//   Delete,
//   ParseIntPipe,
//   ValidationPipe,
// } from '@nestjs/common';
// import { ProductService } from './variant.service';
// import { Product } from './entities/attribute.entity';
// import { CreateProductDto } from './dto/create-variant.dto';
// import { UpdateProductDto } from './dto/update-variant.dto';

// @Controller('products')
// export class ProductController {
//   constructor(private readonly productService: ProductService) {}

//   @Post()
//   async create(
//     @Body(ValidationPipe) createCategoryDto: CreateProductDto,
//   ): Promise<Product> {
//     return await this.productService.create(createCategoryDto);
//   }

//   @Get()
//   async findAll(): Promise<Product[]> {
//     return await this.productService.findAll();
//   }

//   @Get(':id')
//   async findOne(@Param('id', ParseIntPipe) id: number): Promise<Product> {
//     return await this.productService.findOne(id);
//   }

//   @Patch(':id')
//   async update(
//     @Param('id', ParseIntPipe) id: number,
//     @Body(ValidationPipe) updateCategoryDto: UpdateProductDto,
//   ): Promise<Product> {
//     return await this.productService.update(id, updateCategoryDto);
//   }

//   @Delete(':id')
//   async remove(
//     @Param('id', ParseIntPipe) id: number,
//   ): Promise<{ message: string }> {
//     await this.productService.remove(id);
//     return { message: 'Category deleted successfully' };
//   }
// }
