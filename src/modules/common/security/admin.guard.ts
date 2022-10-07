import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Role                                      } from '../../tokens';
import { extractTokenPayload                       } from './security-utils';

@Injectable()
export class AdminGuard implements CanActivate {

    public canActivate(context: ExecutionContext): boolean {

        const payload = extractTokenPayload(context.switchToHttp().getRequest()); 

        if (!payload) return false;

        return [Role.ADMIN, Role.SUPERADMIN].includes(payload.role); // admin, superadmin can access
    }

}
