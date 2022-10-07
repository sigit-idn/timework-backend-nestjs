import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Role                                      } from '../../tokens';
import { extractTokenPayload                       } from './security-utils';

@Injectable()
export class EmployeeGuard implements CanActivate {

    public canActivate(context: ExecutionContext): boolean {

        const payload = extractTokenPayload(context.switchToHttp().getRequest()); 

        if (!payload) return false;

        return Object.values(Role).includes(payload.role); // employee, admin, superadmin can access
    }

}
