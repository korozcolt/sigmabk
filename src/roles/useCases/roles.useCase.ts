import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../entities/roles.entity';
import { CreateRoleDto } from '../dto/create-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';

@Injectable()
export class RolesUseCase {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async createRole(createRoleDto: CreateRoleDto) {
    const role = this.roleRepository.create(createRoleDto);
    return this.roleRepository.save(role);
  }

  updateRole(id: number, updateRoleDto: UpdateRoleDto) {
    return this.roleRepository.update(id, updateRoleDto);
  }

  deleteRole(id: number) {
    return this.roleRepository.delete(id);
  }

  findAllRoles() {
    return this.roleRepository.find();
  }

  findRoleById(id: number) {
    return this.roleRepository.findOne({ where: { id } });
  }

  findRoleByName(name: string) {
    return this.roleRepository.findOne({ where: { name } });
  }
}
