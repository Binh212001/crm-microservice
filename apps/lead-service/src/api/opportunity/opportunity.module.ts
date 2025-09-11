import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { OpportunityController } from './opportunity.controller';
import { OpportunityService } from './opportunity.service';
import { OpportunityRepository } from './repositories/opportunity.repository';
import { OpportunityLineRepository } from './repositories/opportunity-line.repository';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PRODUCT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://guest:guest@localhost:5672'],
          queue: 'PRODUCT_QUEUE',
          queueOptions: { durable: false },
        },
      },
      {
        name: 'EMAIL_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://guest:guest@localhost:5672'],
          queue: 'EMAIL_QUEUE',
          queueOptions: { durable: false },
        },
      },
      {
        name: 'ORDER_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://guest:guest@localhost:5672'],
          queue: 'ORDER_QUEUE',
          queueOptions: { durable: false },
        },
      },
    ]),
  ],
  controllers: [OpportunityController],
  providers: [
    OpportunityService,
    OpportunityRepository,
    OpportunityLineRepository,
  ],
  exports: [
    OpportunityService,
    OpportunityRepository,
    OpportunityLineRepository,
  ],
})
export class OpportunityModule {}
