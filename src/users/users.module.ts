import { Module } from '@nestjs/common';
import { RolesModule } from 'src/roles/roles.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { UsersUseCase } from './useCases/users.useCase';

@Module({
  imports: [RolesModule, TypeOrmModule.forFeature([User])],
  providers: [UsersService, UsersUseCase],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
