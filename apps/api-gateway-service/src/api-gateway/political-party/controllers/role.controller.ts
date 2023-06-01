import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { RequestRoleDto } from '../models/role.dto';

@ApiTags('roles')
@Controller('roles')
export class RoleController {
    constructor(@Inject('POLITICAL_PARTY_SERVICE') private client: ClientProxy) { }

    @Post()
    createRole(@Body() requestRoleDto: RequestRoleDto) {
        return this.client.send({ cmd: 'createRole' }, requestRoleDto);
    }

    @Get()
    findAllRoles() {
        return this.client.send({ cmd: 'findAllRoles' }, '');
    }

    @Get(':id')
    findOneRole(@Param('id', ParseIntPipe) id: number) {
        return this.client.send({ cmd: 'findOneRole' }, id);
    }

    @Patch(':id')
    updateRole(@Param('id', ParseIntPipe) id: string, @Body() requestRoleDto: RequestRoleDto) {
        return this.client.send({ cmd: 'updateRole' }, {id,requestRoleDto});
    }

    @Delete(':id')
    removeRole(@Param('id', ParseIntPipe) id: number) {
        return this.client.send({ cmd: 'removeRole' }, id);
    }
}
