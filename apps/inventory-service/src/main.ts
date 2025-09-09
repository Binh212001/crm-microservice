import { NestFactory } from '@nestjs/core';
import { ApiModule } from './api/api.module';
import { initializeTransactionalContext } from 'typeorm-transactional';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  initializeTransactionalContext();
  const app = await NestFactory.create(ApiModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://guest:guest@localhost:5672'], // URL RabbitMQ
      queue: 'PRODUCT_QUEUE', // tên queue của service
      queueOptions: {
        durable: false,
      },
    },
  });
  await app.startAllMicroservices();
  await app.listen(process.env.port ?? 3001);
}
bootstrap();
