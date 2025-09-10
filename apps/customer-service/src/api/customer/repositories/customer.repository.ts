import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from '../../../database/repositories/base.repository';
import { Customer } from '../entities/customer.entity';

@Injectable()
export class CustomerRepository extends BaseRepository<Customer> {
  constructor(private readonly dataSource: DataSource) {
    super(Customer, dataSource.manager);
  }
}
