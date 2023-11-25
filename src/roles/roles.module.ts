import { Module } from '@nestjs/common';
import { Role } from './entities/roles.entity';
import { RolesController } from './controllers/roles.controller';
import { RolesService } from './services/roles.service';
import { RolesUseCase } from './useCases/roles.useCase';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  providers: [RolesService, RolesUseCase],
  controllers: [RolesController],
  exports: [RolesService],
})
export class RolesModule {}
