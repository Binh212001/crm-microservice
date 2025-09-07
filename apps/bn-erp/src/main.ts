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
  app.use(
    '/bunny-cloud-service',
    createProxyMiddleware({
      target: 'http://localhost:3002',
      changeOrigin: true,
      pathRewrite: { '^/bunny-cloud-service': 'bunny-cloud-service' },
    }),
  );
  app.use(
    '/user-service',
    createProxyMiddleware({
      target: 'http://localhost:3003',
      changeOrigin: true,
      pathRewrite: { '^/user-service': 'user-service' },
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
