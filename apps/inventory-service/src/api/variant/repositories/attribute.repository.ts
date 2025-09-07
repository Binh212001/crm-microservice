import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from '../../../database/repositories/base.repository';
import { Attribute } from '../entities/attribute.entity';

@Injectable()
export class AttributeRepository extends BaseRepository<Attribute> {
  constructor(private readonly dataSource: DataSource) {
    super(Attribute, dataSource.manager);
  }
}
