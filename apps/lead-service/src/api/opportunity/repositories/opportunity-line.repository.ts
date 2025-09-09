import { BaseRepository } from '../../../database/repositories/base.repository';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { OpportunityLine } from '../entities/opportunity-line.entity';

@Injectable()
export class OpportunityLineRepository extends BaseRepository<OpportunityLine> {
  constructor(private readonly dataSource: DataSource) {
    super(OpportunityLine, dataSource.manager);
  }
}
