import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { RolesService } from '../services/roles.service';
import { CreateRoleDto } from '../dto/create-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';
import { AuthGuard } from '../../utils/auth/auth.guard';
@ApiTags('roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Create role' })
  @ApiResponse({
    status: 201,
    description: 'The role has been successfully created.',
  })
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all roles' })
  @ApiResponse({ status: 200, description: 'Return all roles' })
  findAll() {
    return this.rolesService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get role by id' })
  @ApiResponse({
    status: 200,
    description: 'Return the role with the specified id',
  })
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(+id);
  }

  @Get('name/:name')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get role by name' })
  @ApiResponse({
    status: 200,
    description: 'Return the role with the specified name',
  })
  findByName(@Param('name') name: string) {
    return this.rolesService.findByName(name);
  }

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Update role' })
  @ApiResponse({
    status: 200,
    description: 'The role has been successfully updated.',
  })
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Delete role' })
  @ApiResponse({
    status: 200,
    description: 'The role has been successfully deleted.',
  })
  delete(@Param('id') id: string) {
    return this.rolesService.delete(+id);
  }
}
