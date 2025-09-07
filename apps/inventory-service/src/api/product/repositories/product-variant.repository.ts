import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from '../../../database/repositories/base.repository';
import { ProductVariant } from '../entities/product-variant.entity';

@Injectable()
export class ProductVariantRepository extends BaseRepository<ProductVariant> {
  constructor(private readonly dataSource: DataSource) {
    super(ProductVariant, dataSource.manager);
  }
}
