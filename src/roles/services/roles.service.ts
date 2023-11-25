import { CreateRoleDto } from '../dto/create-role.dto';
import { Injectable } from '@nestjs/common';
import { RolesUseCase } from '../useCases/roles.useCase';
import { UpdateRoleDto } from '../dto/update-role.dto';

@Injectable()
export class RolesService {
  constructor(private rolesUseCase: RolesUseCase) {}

  create(createRoleDto: CreateRoleDto) {
    return this.rolesUseCase.createRole(createRoleDto);
  }

  findAll() {
    return this.rolesUseCase.findAllRoles();
  }

  findOne(id: number) {
    return this.rolesUseCase.findRoleById(id);
  }

  findByName(name: string) {
    return this.rolesUseCase.findRoleByName(name);
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    await this.rolesUseCase.updateRole(id, updateRoleDto);
    return this.rolesUseCase.findRoleById(id);
  }

  delete(id: number) {
    return this.rolesUseCase.deleteRole(id);
  }
}
