import {
  Body,
  Controller,
  Get,
  ParseIntPipe,
  Post,
  Param,
  ValidationPipe,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import { CreateVariantDto } from './dto/create-variant.dto';
import { VariantService } from './variant.service';
import { Attribute } from './entities/attribute.entity';
import { UpdateVariantDto } from './dto/update-variant.dto';
import { VariantReqDto } from './dto/variant-req.dto';
import { PaginationResponse } from '../../comom/pagination/pagination';
import { VariantResDto } from './dto/variant-res.dto';
import { UpdateDeleteResDto } from '../../comom/response/update-delete-res.dto';

@Controller('variants')
export class VariantController {
  constructor(private readonly variantService: VariantService) {}

  @Post()
  async create(
    @Body(ValidationPipe) createCategoryDto: CreateVariantDto,
  ): Promise<Attribute> {
    return await this.variantService.create(createCategoryDto);
  }

  @Get()
  async findAll(
    @Query() variantReqDto: VariantReqDto,
  ): Promise<PaginationResponse<VariantResDto>> {
    return await this.variantService.findAll(variantReqDto);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<VariantResDto> {
    return await this.variantService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateCategoryDto: UpdateVariantDto,
  ): Promise<UpdateDeleteResDto> {
    return await this.variantService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UpdateDeleteResDto> {
    return await this.variantService.remove(id);
  }
}
