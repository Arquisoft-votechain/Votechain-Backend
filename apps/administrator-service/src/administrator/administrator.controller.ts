import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdministratorService } from './administrator.service';
import { CreateAdministratorDto } from './dto/create-administrator.dto';
import { UpdateAdministratorDto } from './dto/update-administrator.dto';
import { MessagePattern } from '@nestjs/microservices';

@Controller('administrator')
export class AdministratorController {
  constructor(private readonly administratorService: AdministratorService) {}

  @Post()
  @MessagePattern({ cmd: 'createAdmin' })
  createAdmin(@Body() createAdministratorDto: CreateAdministratorDto) {
    return this.administratorService.create(createAdministratorDto);
  }

  @Get()
  @MessagePattern({ cmd: 'findAllAdmins' })
  findAllAdmins() {
    return this.administratorService.findAll();
  }

  @Get(':id')
  @MessagePattern({ cmd: 'findOneAdmin' })
  findOneAdmin(@Param('id') id: string) {
    return this.administratorService.findOne(+id);
  }

  @Get('/dni/:dni')
  @MessagePattern({ cmd: 'findAdminByDNI' })
  findAdminByDNI(@Param('dni') dni: string) {
    return this.administratorService.findByDNI(+dni);
  }

  @Patch(':id')
  @MessagePattern({ cmd: 'updateAdmin' })
  updateAdmin(@Param('id') id: string, @Body() updateAdministratorDto: UpdateAdministratorDto) {
    return this.administratorService.update(+id, updateAdministratorDto);
  }

  @Delete(':id')
  @MessagePattern({ cmd: 'removeAdmin' })
  removeAdmin(@Param('id') id: string) {
    return this.administratorService.remove(+id);
  }
}
