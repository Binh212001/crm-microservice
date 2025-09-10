import { BaseRepository } from '../../../database/repositories/base.repository';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Order } from '../entities/order.entity';

@Injectable()
export class OrderRepository extends BaseRepository<Order> {
  constructor(private readonly dataSource: DataSource) {
    super(Order, dataSource.manager);
  }
}
