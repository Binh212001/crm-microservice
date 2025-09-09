import { BaseRepository } from '../../../database/repositories/base.repository';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { LeadLine } from '../entities/lead-line.entity';

@Injectable()
export class LeadLineRepository extends BaseRepository<LeadLine> {
  constructor(private readonly dataSource: DataSource) {
    super(LeadLine, dataSource.manager);
  }
}
