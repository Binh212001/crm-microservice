import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as jwt from 'jsonwebtoken';
import { IS_ROLE_KEY } from 'apps/libs/decorators/role.decorator';
import { IS_PUBLIC_KEY } from 'apps/libs/decorators/public.decorator';
@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // 1. Nếu @Public thì bỏ qua check
    const isPublic = this.reflector.get<boolean>(
      IS_PUBLIC_KEY,
      context.getHandler(),
    );
    if (isPublic) return true;

    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
    if (!authHeader)
      throw new UnauthorizedException('Missing Authorization header');

    const token = authHeader.split(' ')[1];
    if (!token) throw new UnauthorizedException('Invalid token format');

    try {
      // 2. Giải mã JWT
      const decoded: any = jwt.verify(
        token,
        process.env.JWT_SECRET! || 'secretKey',
      );
      request.user = decoded;

      // 3. Lấy metadata roles & permissions từ decorator
      const requiredRoles =
        this.reflector.get<string[]>(IS_ROLE_KEY, context.getHandler()) || [];

      // 4. Check role
      if (requiredRoles.length > 0) {
        const hasRole = requiredRoles.some((role) =>
          decoded.roles?.includes(role),
        );
        if (!hasRole) {
          throw new ForbiddenException('Insufficient role');
        }
      }

      return true;
    } catch (err) {
      console.error('JWT error:', err.message);
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
