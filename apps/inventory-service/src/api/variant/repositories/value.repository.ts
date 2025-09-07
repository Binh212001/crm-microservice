import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from '../../../database/repositories/base.repository';
import { Value } from '../entities/value.entity';

@Injectable()
export class ValueRepository extends BaseRepository<Value> {
  constructor(private readonly dataSource: DataSource) {
    super(Value, dataSource.manager);
  }
}
