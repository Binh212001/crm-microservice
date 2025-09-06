// proxy.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { createProxyMiddleware } from 'http-proxy-middleware';

@Injectable()
export class ProxyMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    if (req.url.startsWith('/inventory-service')) {
      console.log('🚀 Proxying:', req.url);

      return createProxyMiddleware({
        target: 'http://localhost:3001',
        changeOrigin: true,
        pathRewrite: { '^/inventory-service': '' }, // bỏ prefix
      })(req, res, next);
    }

    next();
  }
}
