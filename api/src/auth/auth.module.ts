import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { AccessTokenStrategy } from './strategies/accessToken.strategy';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy';

@Module({
  imports:[JwtModule.register({}),UsersModule],
  controllers: [AuthController],
  providers: [AuthService,AccessTokenStrategy,RefreshTokenStrategy]
})
export class AuthModule {}
