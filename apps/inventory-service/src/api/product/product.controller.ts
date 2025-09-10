import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PaginationResponse } from '../../comom/pagination/pagination';
import { UpdateDeleteResDto } from '../../comom/response/update-delete-res.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductReqDto } from './dto/product-req.dto';
import { ProductResDto } from './dto/product-res.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';
import { Role } from 'apps/libs/decorators/role.decorator';
import { RoleEnum } from 'apps/user-service/src/api/user/enums/role';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Role(RoleEnum.ADMIN)
  @Post()
  async create(@Body() createCategoryDto: CreateProductDto): Promise<Product> {
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

  @Role(RoleEnum.ADMIN)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategoryDto: UpdateProductDto,
  ): Promise<UpdateDeleteResDto> {
    return await this.productService.update(id, updateCategoryDto);
  }

  @Role(RoleEnum.ADMIN)
  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UpdateDeleteResDto> {
    return await this.productService.remove(id);
  }

  @MessagePattern({
    cmd: 'get_product_by_ids',
    queue: 'PRODUCT_QUEUE',
  })
  async getProductByIds(@Payload() ids: number[]): Promise<ProductResDto[]> {
    return await this.productService.findByIds(ids);
  }

  @MessagePattern({
    cmd: 'get_product_by_id',
    queue: 'PRODUCT_QUEUE',
  })
  async getProductById(@Payload() id: number): Promise<ProductResDto | null> {
    return await this.productService.findOneById(id);
  }
}
