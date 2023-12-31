import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy
  ],
  imports: [
    forwardRef(() => UsersModule),
    PassportModule,
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'SECRETKEY',
      signOptions: { expiresIn: '30m' }
    })
  ],
  controllers: [AuthController],
  exports: [AuthService, JwtModule]
})
export class AuthModule { }
