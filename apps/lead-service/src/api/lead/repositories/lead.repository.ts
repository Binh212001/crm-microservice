import { BaseRepository } from '../../../database/repositories/base.repository';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Lead } from '../entities/lead.entity';

@Injectable()
export class LeadRepository extends BaseRepository<Lead> {
  constructor(private readonly dataSource: DataSource) {
    super(Lead, dataSource.manager);
  }
}
