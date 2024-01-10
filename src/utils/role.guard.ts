import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { Request } from 'express'
import { Observable } from 'rxjs'
import { JwtService } from '@nestjs/jwt';
import { jwtConstant } from './constants'

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}
    async canActivate(context: ExecutionContext): Promise<boolean>{
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
          throw new UnauthorizedException();
        }
        try {
            const payload = await this.jwtService.verifyAsync(
                token,
                {
                  secret: jwtConstant.secret
                }
              );
            if(payload.role === 'admin') return true;
        } catch (error) {
            throw new UnauthorizedException();
        }
        throw new UnauthorizedException();
    }
      private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}