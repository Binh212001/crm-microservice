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
import { RoleEnum } from 'apps/user-service/src/api/user/enums/role';
import { Role } from 'apps/libs/decorators/role.decorator';

@Controller('variants')
export class VariantController {
  constructor(private readonly variantService: VariantService) {}

  @Role(RoleEnum.ADMIN)
  @Post()
  async create(
    @Body(ValidationPipe) createCategoryDto: CreateVariantDto,
  ): Promise<Attribute> {
    return await this.variantService.create(createCategoryDto);
  }

  @Role(RoleEnum.ADMIN)
  @Get()
  async findAll(
    @Query() variantReqDto: VariantReqDto,
  ): Promise<PaginationResponse<VariantResDto>> {
    return await this.variantService.findAll(variantReqDto);
  }

  @Role(RoleEnum.ADMIN)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<VariantResDto> {
    return await this.variantService.findOne(id);
  }

  @Role(RoleEnum.ADMIN)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateCategoryDto: UpdateVariantDto,
  ): Promise<UpdateDeleteResDto> {
    return await this.variantService.update(id, updateCategoryDto);
  }

  @Role(RoleEnum.ADMIN)
  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UpdateDeleteResDto> {
    return await this.variantService.remove(id);
  }
}
