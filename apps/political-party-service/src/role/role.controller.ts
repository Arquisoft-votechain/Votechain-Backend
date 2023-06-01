import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { RoleService } from './role.service';
import { RequestRoleDto } from './dto/request-role.dto';
import { ResponseRoleDto } from './dto/response-role.dto';
import { ApiTags } from '@nestjs/swagger';
import { MessagePattern } from '@nestjs/microservices';

@ApiTags('role')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @MessagePattern({ cmd: 'createRole' })
  createRole(requestRoleDto: RequestRoleDto) {
    return this.roleService.create(requestRoleDto);
  }

  @MessagePattern({ cmd: 'findAllRoles' })
  findAllRoles() {
    return this.roleService.findAll();
  }

  @MessagePattern({ cmd: 'findOneRole' })
  findOneRole(id: number) {
    return this.roleService.findOne(id);
  }

  @MessagePattern({ cmd: 'updateRole' })
  updateRole(data: { id: number, requestRoleDto: RequestRoleDto}) {
    const {id , requestRoleDto} = data;
    return this.roleService.update(id, requestRoleDto);
  }

  @MessagePattern({ cmd: 'removeRole' })
  removeRole(id: number) {
    return this.roleService.remove(id);
  }
}
