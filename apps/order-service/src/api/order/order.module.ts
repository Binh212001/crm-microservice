import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderRepository } from './repositories/order.repository';
import { OrderLineRepository } from './repositories/order-line.repository';

@Module({
  controllers: [OrderController],
  providers: [OrderService, OrderRepository, OrderLineRepository],
  exports: [OrderService, OrderRepository, OrderLineRepository],
})
export class OrderModule {}
