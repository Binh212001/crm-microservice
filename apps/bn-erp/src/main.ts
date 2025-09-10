import { NestFactory } from '@nestjs/core';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
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
  app.use(
    '/lead-service',
    createProxyMiddleware({
      target: 'http://localhost:3005',
      changeOrigin: true,
      pathRewrite: { '^/lead-service': 'lead-service' },
    }),
  );
  app.use(
    '/order-service',
    createProxyMiddleware({
      target: 'http://localhost:3006',
      changeOrigin: true,
      pathRewrite: { '^/order-service': 'order-service' },
    }),
  );
  app.use(
    '/opportunity-service',
    createProxyMiddleware({
      target: 'http://localhost:3007',
      changeOrigin: true,
      pathRewrite: { '^/opportunity-service': 'opportunity-service' },
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
