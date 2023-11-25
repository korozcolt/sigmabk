import { CreateUserDto } from '../dto/create-user.dto';
import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UsersUseCase } from '../useCases/users.useCase';

@Injectable()
export class UsersService {
  constructor(private userUseCase: UsersUseCase) {}

  create(createUserDto: CreateUserDto) {
    return this.userUseCase.createUser(createUserDto);
  }

  findAll() {
    return this.userUseCase.findAllUsers();
  }

  findOne(id: number) {
    return this.userUseCase.findUserById(id);
  }

  findByName(name: string) {
    return this.userUseCase.findUserByName(name);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.userUseCase.updateUser(id, updateUserDto);
    return this.userUseCase.findUserById(id);
  }

  delete(id: number) {
    return this.userUseCase.deleteUser(id);
  }
}
