import { NestFactory, Reflector } from '@nestjs/core';
import { UserServiceModule } from './api/user-service.module';
import { JwtAuthGuard } from 'apps/libs/jwt/jwt-auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(UserServiceModule);
  app.useGlobalGuards(new JwtAuthGuard(app.get(Reflector)));
  await app.listen(process.env.port ?? 3003);
}
bootstrap();
