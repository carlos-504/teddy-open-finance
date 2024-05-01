import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UserPayload, UserReq } from './interfaces/authentication.interface';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from 'src/utils/public-route';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const req = context.switchToHttp().getRequest<UserReq>();
    const token = this.getTokenHeader(req);

    if (isPublic && !token) {
      return true;
    }

    if (!token) {
      throw new UnauthorizedException('authentication failed');
    }

    await this.validToken(token, req);

    return true;
  }

  private getTokenHeader(req: Request): string | undefined {
    const [type, token] = req.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private async validToken(token: string, req: UserReq) {
    try {
      const payload: UserPayload = await this.jwtService.verifyAsync(token);
      req.user = payload;
    } catch (error) {
      throw new UnauthorizedException('invalid JWT');
    }
  }
}
