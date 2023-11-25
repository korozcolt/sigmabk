import { Repository } from 'typeorm';
import { User } from '../entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { RolesService } from 'src/roles/services/roles.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersUseCase {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly roleService: RolesService,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const role = await this.roleService.findByName(createUserDto.role);
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      saltRounds,
    );

    if (!role) {
      throw new Error(`Role ${createUserDto.role} not found`);
    }
    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
      role,
    });
    return this.userRepository.save(user);
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }

    if (updateUserDto.role) {
      const role = await this.roleService.findByName(updateUserDto.role);
      if (!role) {
        throw new Error(`Role ${updateUserDto.role} not found`);
      }
      updateUserDto.role = role.name;
    }

    Object.assign(user, updateUserDto);
    return this.userRepository.save(user);
  }

  deleteUser(id: number) {
    return this.userRepository.delete(id);
  }

  findAllUsers() {
    return this.userRepository.find();
  }

  findUserById(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  findUserByName(username: string) {
    return this.userRepository.findOne({ where: { username } });
  }
}
