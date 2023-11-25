import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { JwtConfigModule } from '../config/JwtConfig.module';
import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule, JwtConfigModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
