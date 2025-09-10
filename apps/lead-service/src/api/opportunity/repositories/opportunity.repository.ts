import { BaseRepository } from '../../../database/repositories/base.repository';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Opportunity } from '../entities/opportunity.entity';

@Injectable()
export class OpportunityRepository extends BaseRepository<Opportunity> {
  constructor(private readonly dataSource: DataSource) {
    super(Opportunity, dataSource.manager);
  }
}
