import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { LeadController } from './lead.controller';
import { LeadService } from './lead.service';
import { LeadLineRepository } from './repositories/lead-line.repository';
import { LeadRepository } from './repositories/lead.repository';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PRODUCT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://guest:guest@localhost:5672'],
          queue: 'PRODUCT_QUEUE',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [LeadController],
  providers: [LeadService, LeadRepository, LeadLineRepository],
  exports: [LeadService, LeadRepository, LeadLineRepository],
})
export class LeadModule {}
