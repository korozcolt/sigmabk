import * as bcrypt from 'bcrypt';

import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../dto/login.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { UsersService } from '../../users/services/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(loginDto: LoginDto): Promise<any> {
    const user = await this.usersService.findByName(loginDto.username);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    try {
      const isPasswordMatching = await bcrypt.compare(
        loginDto.password,
        user.password,
      );

      if (user.isActive && isPasswordMatching) {
        delete user.password;
        return user;
      } else {
        throw new UnauthorizedException('Invalid credentials');
      }
    } catch (error) {
      throw new InternalServerErrorException('Error comparing passwords');
    }
  }

  async login(loginDto: LoginDto) {
    try {
      const user = await this.validateUser(loginDto);
      if (!user) {
        throw new NotFoundException('User not found');
      }

      await this.updateLastLogin(user.id);

      const payload = { username: user.username, sub: user.id };
      return {
        access_token: this.jwtService.sign(payload),
      };
    } catch (error) {
      const err = error as Error;
      if (err.message.includes('updateLastLogin')) {
        throw new UnauthorizedException('Failed to update last login');
      } else if (err.message.includes('jwtService.sign')) {
        throw new InternalServerErrorException(
          'Failed to generate access token',
        );
      } else if (error instanceof UnauthorizedException) {
        throw new UnauthorizedException('Invalid credentials');
      } else if (error instanceof NotFoundException) {
        throw new UnauthorizedException('User not found');
      } else {
        throw new InternalServerErrorException('An unexpected error occurred');
      }
    }
  }

  async updateLastLogin(userId: number) {
    const user = await this.usersService.findOne(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const updateUserDto: UpdateUserDto = {
      ...user,
      role: user.role as unknown as string, // Convert 'Role' to 'string'
      lastLogin: new Date(),
    };

    await this.usersService.update(userId, updateUserDto);
  }

  async register(createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}
