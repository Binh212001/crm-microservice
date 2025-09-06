import { NestFactory } from '@nestjs/core';
import { ApiModule } from './api/api.module';
import { initializeTransactionalContext } from 'typeorm-transactional';

async function bootstrap() {
  initializeTransactionalContext();
  const app = await NestFactory.create(ApiModule);
  await app.listen(process.env.port ?? 3001);
}
bootstrap();
