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
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductReqDto } from './dto/product-req.dto';
import { ProductResDto } from './dto/product-res.dto';
import { PaginationResponse } from '../../comom/pagination/pagination';
import { UpdateDeleteResDto } from '../../comom/response/update-delete-res.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(
    @Body(ValidationPipe) createCategoryDto: CreateProductDto,
  ): Promise<Product> {
    return await this.productService.create(createCategoryDto);
  }

  @Get()
  async findAll(
    @Query() productReqDto: ProductReqDto,
  ): Promise<PaginationResponse<ProductResDto>> {
    return await this.productService.findAll(productReqDto);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<ProductResDto> {
    return await this.productService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategoryDto: UpdateProductDto,
  ): Promise<UpdateDeleteResDto> {
    return await this.productService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UpdateDeleteResDto> {
    return await this.productService.remove(id);
  }
}
