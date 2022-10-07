import { Module          } from '@nestjs/common';
import { EmployeeModule  } from '../employee/employee.module';
import { AuthService     } from './auth.service';
import { LocalStrategy   } from './local.strategy';
import { PassportModule  } from '@nestjs/passport';
import { JwtModule       } from '@nestjs/jwt';
import { jwtConstants    } from './constants';
import { JwtStrategy     } from './jwt.strategy';
import { AuthController  } from './auth.controller';


@Module({
  imports: [
    EmployeeModule, 
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
