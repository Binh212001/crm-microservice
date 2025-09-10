import { JwtAuthGuard } from 'apps/libs/jwt/jwt-auth.guard';
import { NestFactory, Reflector } from '@nestjs/core';
import { initializeTransactionalContext } from 'typeorm-transactional';
import { ApiModule } from './api/api.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  initializeTransactionalContext();
  const app = await NestFactory.create(ApiModule);
  app.useGlobalGuards(new JwtAuthGuard(app.get(Reflector)));
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
