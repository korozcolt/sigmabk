import { Test, TestingModule } from '@nestjs/testing';

import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UsersController } from './users.controller';
import { UsersService } from '../services/users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            findByName: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', async () => {
    const dto: CreateUserDto = {
      username: 'Test User',
      email: 'test@example.com',
      fullName: 'Test User',
      phone: '1234567890',
      password: 'password',
      isActive: true,
      role: 'user',
    };
    (service.create as jest.Mock).mockResolvedValue(dto);
    expect(await controller.create(dto)).toEqual(dto);
  });

  it('should find all users', async () => {
    const result = [{ id: 1 }, { id: 2 }];
    (service.findAll as jest.Mock).mockResolvedValue(result);
    expect(await controller.findAll()).toEqual(result);
  });

  it('should find one user', async () => {
    const result = { id: 1 };
    (service.findOne as jest.Mock).mockResolvedValue(result);
    expect(await controller.findOne('1')).toEqual(result);
  });

  it('should find user by name', async () => {
    const result = { id: 1, name: 'Test User' };
    (service.findByName as jest.Mock).mockResolvedValue(result);
    expect(await controller.findByName('Test User')).toEqual(result);
  });

  it('should update a user', async () => {
    const dto: UpdateUserDto = {
      username: 'Updated User',
      email: 'updated@example.com',
      isActive: true,
    };
    (service.update as jest.Mock).mockResolvedValue(dto);
    expect(await controller.update('1', dto)).toEqual(dto);
  });

  it('should delete a user', async () => {
    (service.delete as jest.Mock).mockResolvedValue({ deleted: true });
    expect(await controller.delete('1')).toEqual({ deleted: true });
  });
});
