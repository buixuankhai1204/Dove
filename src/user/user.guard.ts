import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { Request } from 'express'
import { Reflector } from '@nestjs/core';
import { Roles } from '../roles.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get(Roles,context.getHandler());
    if(!roles) {
      return true
    }
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        {
          secret: jwtConstants.secret
        }
      );

      request['user'] = payload;
      console.log(request['user'])

      return this.matchRoles(roles, request['user'].role);
    } catch {
      throw new UnauthorizedException();
    }
    return true;

  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private matchRoles(roles: string[], verifyRole: string) : boolean {
    for (let i = 0; i < roles.length; i++) {
      if(roles[i] === verifyRole){
        return true;
      }
    }

    return false;
  }
}
