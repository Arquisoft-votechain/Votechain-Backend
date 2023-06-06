import { Controller} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MessagePattern } from '@nestjs/microservices';
import { RoleBasicResponse, RoleRequest, RoleResponse, RoleServiceImpl } from 'src/application/index.application';


@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleServiceImpl) {}

  @MessagePattern({ cmd: 'createRole' })
  async createRole(requestRoleDto: RoleRequest): Promise<RoleResponse> {
    return await this.roleService.createRole(requestRoleDto);
  }

  @MessagePattern({ cmd: 'findAllRoles' })
  async findAllRoles(): Promise<RoleBasicResponse[]> {
    return await this.roleService.getAllRoles();
  }

  @MessagePattern({ cmd: 'findOneRole' })
  async findOneRole(id: number): Promise<RoleResponse>  {
    return await this.roleService.getRoleById(id);
  }

  @MessagePattern({ cmd: 'updateRole' })
  async updateRole(data: { id: number, requestRoleDto: RoleRequest}): Promise<RoleResponse>  {
    const {id , requestRoleDto} = data;
    return await this.roleService.updateRoleById(id, requestRoleDto);
  }

  @MessagePattern({ cmd: 'removeRole' })
  async removeRole(id: number): Promise<RoleResponse>  {
    return await this.roleService.deleteRoleById(id);
  }
}
