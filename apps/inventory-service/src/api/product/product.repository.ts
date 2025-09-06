import { BaseRepository } from '../../database/repositories/base.repository';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductRepository extends BaseRepository<Product> {
  constructor(private readonly dataSource: DataSource) {
    super(Product, dataSource.manager);
  }
}
