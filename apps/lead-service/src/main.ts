import { NestFactory } from '@nestjs/core';
import { LeadServiceModule } from './lead-service.module';

async function bootstrap() {
  const app = await NestFactory.create(LeadServiceModule);
  await app.listen(process.env.port ?? 3005);
}
bootstrap();
