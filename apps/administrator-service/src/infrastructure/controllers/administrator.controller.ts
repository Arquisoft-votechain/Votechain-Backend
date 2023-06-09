import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdministratorServiceImpl } from '../../application/administrator/services/administratorImpl.service';
import { CreateAdministratorDto } from '../../application/administrator/dto/create-administrator.dto';
import { UpdateAdministratorDto } from '../../application/administrator/dto/update-administrator.dto';
import { MessagePattern } from '@nestjs/microservices';

@Controller('administrator')
export class AdministratorController {
  constructor(private readonly administratorService: AdministratorServiceImpl) {}

  @Post()
  @MessagePattern({ cmd: 'createAdmin' })
  createAdmin(data: {createAdministratorDto: CreateAdministratorDto}) {
    const {createAdministratorDto} = data
    return this.administratorService.create(createAdministratorDto);
  }

  @Get()
  @MessagePattern({ cmd: 'findAllAdmins' })
  findAllAdmins() {
    return this.administratorService.findAll();
  }

  @Get(':id')
  @MessagePattern({ cmd: 'findOneAdmin' })
  findOneAdmin(@Param('id') id: number) {
    return this.administratorService.findOne(id);
  }

  @Get('/dni/:dni')
  @MessagePattern({ cmd: 'findAdminByDNI' })
  findAdminByDNI(@Param('dni') dni: string) {
    return this.administratorService.findByDNI(+dni);
  }

  @Get('/user/:userId')
  @MessagePattern({ cmd: 'findAdminByUserId' })
  findAdminByUserId(@Param('userId') userId: string) {
    return this.administratorService.findByUserId(+userId);
  }

  @Patch(':id')
  @MessagePattern({ cmd: 'updateAdmin' })
  updateAdmin(data: { id: string, updateAdministratorDto: UpdateAdministratorDto}) {
    const {id, updateAdministratorDto} = data;
    return this.administratorService.update(+id, updateAdministratorDto);
  }

  @Delete(':id')
  @MessagePattern({ cmd: 'removeAdmin' })
  removeAdmin(@Param('id') id: string) {
    return this.administratorService.remove(+id);
  }
}
