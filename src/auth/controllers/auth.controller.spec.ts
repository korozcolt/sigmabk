import { Test, TestingModule } from '@nestjs/testing';

import { AuthController } from './auth.controller';
import { AuthService } from '../services/auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDto } from '../dto/login.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn(),
            register: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should log in a user', async () => {
    const dto: LoginDto = { username: 'Test User', password: 'password' };
    (service.login as jest.Mock).mockResolvedValue('Login successful');
    expect(await controller.login(dto)).toEqual('Login successful');
  });

  it('should register a user', async () => {
    const dto: CreateUserDto = {
      username: 'Test User',
      email: 'test@example.com',
      fullName: 'Test User',
      phone: '1234567890',
      password: 'password',
      isActive: true,
      role: 'user',
    };
    (service.register as jest.Mock).mockResolvedValue(
      'User registered successfully',
    );
    expect(await controller.register(dto)).toEqual(
      'User registered successfully',
    );
  });

  it('should log out a user', async () => {
    expect(await controller.logout()).toEqual('User logged out successfully');
  });
});
