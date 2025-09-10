import { BaseRepository } from '../../../database/repositories/base.repository';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { OrderLine } from '../entities/order-line.entity';

@Injectable()
export class OrderLineRepository extends BaseRepository<OrderLine> {
  constructor(private readonly dataSource: DataSource) {
    super(OrderLine, dataSource.manager);
  }
}
