import { NestFactory } from '@nestjs/core';
import { BunnyCloudServiceModule } from './bunny-cloud-service.module';

async function bootstrap() {
  const app = await NestFactory.create(BunnyCloudServiceModule);
  await app.listen(process.env.port ?? 3002);
}
bootstrap();
