import { Test, TestingModule } from '@nestjs/testing';

import { CreateRoleDto } from '../dto/create-role.dto';
import { RolesController } from './roles.controller';
import { RolesService } from '../services/roles.service';
import { UpdateRoleDto } from '../dto/update-role.dto';

describe('RolesController', () => {
  let controller: RolesController;
  let service: RolesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RolesController],
      providers: [
        {
          provide: RolesService,
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

    controller = module.get<RolesController>(RolesController);
    service = module.get<RolesService>(RolesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a role', async () => {
    const dto: CreateRoleDto = { name: 'Test Role' };
    (service.create as jest.Mock).mockResolvedValue(
      'Role created successfully',
    );
    expect(await controller.create(dto)).toEqual('Role created successfully');
  });

  it('should get all roles', async () => {
    (service.findAll as jest.Mock).mockResolvedValue(['Role1', 'Role2']);
    expect(await controller.findAll()).toEqual(['Role1', 'Role2']);
  });

  it('should get a role by id', async () => {
    (service.findOne as jest.Mock).mockResolvedValue('Role1');
    expect(await controller.findOne('1')).toEqual('Role1');
  });

  it('should get a role by name', async () => {
    (service.findByName as jest.Mock).mockResolvedValue('Role1');
    expect(await controller.findByName('Role1')).toEqual('Role1');
  });

  it('should update a role', async () => {
    const dto: UpdateRoleDto = { name: 'Updated Role' };
    (service.update as jest.Mock).mockResolvedValue(
      'Role updated successfully',
    );
    expect(await controller.update('1', dto)).toEqual(
      'Role updated successfully',
    );
  });

  it('should delete a role', async () => {
    (service.delete as jest.Mock).mockResolvedValue(
      'Role deleted successfully',
    );
    expect(await controller.delete('1')).toEqual('Role deleted successfully');
  });
});
