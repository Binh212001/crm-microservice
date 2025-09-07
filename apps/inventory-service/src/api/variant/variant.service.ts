import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVariantDto } from './dto/create-variant.dto';
import { Attribute } from './entities/attribute.entity';
import { AttributeRepository } from './repositories/attribute.repository';
import { ValueRepository } from './repositories/value.repository';
import { UpdateVariantDto } from './dto/update-variant.dto';
import { VariantReqDto } from './dto/variant-req.dto';
import { FindOptionsWhere, Like } from 'typeorm';
import {
  pagination,
  PaginationResponse,
} from '../../comom/pagination/pagination';
import { plainToInstance } from 'class-transformer';
import { VariantResDto } from './dto/variant-res.dto';
import { UpdateDeleteResDto } from '../../comom/response/update-delete-res.dto';

@Injectable()
export class VariantService {
  constructor(
    private attributeRepository: AttributeRepository,
    private valueRepository: ValueRepository,
  ) {}

  async create(dto: CreateVariantDto): Promise<Attribute> {
    const attribute = this.attributeRepository.create(dto);
    const values = dto.values.map((value) =>
      this.valueRepository.create({
        name: value.name,
        color: value.color,
      }),
    );
    await this.valueRepository.save(values);
    attribute.values = values;
    return await this.attributeRepository.save(attribute);
  }

  async findAll(
    variantReqDto: VariantReqDto,
  ): Promise<PaginationResponse<VariantResDto>> {
    const { page, limit, order, name } = variantReqDto;
    const where: FindOptionsWhere<Attribute> = {};
    if (name) {
      where.name = Like(`%${name}%`);
    }
    const { data, total } = await pagination({
      page,
      limit,
      repository: this.attributeRepository,
      order: order ? { [order]: 'DESC' } : { createdAt: 'DESC' },
      where,
    });
    return plainToInstance(PaginationResponse<VariantResDto>, {
      page: page ?? 1,
      limit: limit ?? 20,
      total,
      data: plainToInstance(VariantResDto, data),
    });
  }

  async findOne(id: number): Promise<VariantResDto> {
    const variant = await this.attributeRepository.findOne({ where: { id } });
    if (!variant) {
      throw new NotFoundException(`Variant with ID ${id} not found`);
    }
    return plainToInstance(VariantResDto, variant);
  }

  async update(id: number, dto: UpdateVariantDto): Promise<UpdateDeleteResDto> {
    const variant = await this.attributeRepository.findOne({ where: { id } });
    if (!variant) {
      throw new NotFoundException(`Variant with ID ${id} not found`);
    }

    Object.assign(variant, {
      ...dto,
    });
    //if has value remove all value and create new value
    if (dto.values && dto.values.length > 0) {
      await this.valueRepository.remove(variant.values);
      const values = dto.values.map((value) =>
        this.valueRepository.create({
          name: value.name,
          color: value.color,
        }),
      );
      const valueSaved = await this.valueRepository.save(values);
      variant.values = valueSaved;
    }

    await this.attributeRepository.save(variant);
    return plainToInstance(UpdateDeleteResDto, {
      id: variant.id,
    });
  }

  async remove(id: number): Promise<UpdateDeleteResDto> {
    const variant = await this.attributeRepository.findOne({ where: { id } });
    if (!variant) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    await this.attributeRepository.remove(variant);
    return plainToInstance(UpdateDeleteResDto, {
      id: variant.id,
    });
  }
}
