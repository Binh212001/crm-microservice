import { NestFactory } from '@nestjs/core';
import { SettingServiceModule } from './setting-service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(SettingServiceModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://guest:guest@localhost:5672'],
      queue: 'EMAIL_QUEUE',
      queueOptions: { durable: false },
    },
  });
  await app.startAllMicroservices();
  await app.listen(process.env.PORT ?? 3008);
}
bootstrap();
