import { BaseRepository } from '../../database/repositories/base.repository';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryRepository extends BaseRepository<Category> {
  constructor(private readonly dataSource: DataSource) {
    super(Category, dataSource.manager);
  }
}
