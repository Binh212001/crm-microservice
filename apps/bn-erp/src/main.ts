import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createProxyMiddleware } from 'http-proxy-middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    '/inventory-service',
    createProxyMiddleware({
      target: 'http://localhost:3001',
      changeOrigin: true,
      pathRewrite: { '^/inventory-service': 'inventory-service' },
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
