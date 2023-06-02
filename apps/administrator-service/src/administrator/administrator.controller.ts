import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdministratorService } from './administrator.service';
import { CreateAdministratorDto } from './dto/create-administrator.dto';
import { UpdateAdministratorDto } from './dto/update-administrator.dto';

@Controller('administrator')
export class AdministratorController {
  constructor(private readonly administratorService: AdministratorService) {}

  @Post()
  createAdmin(@Body() createAdministratorDto: CreateAdministratorDto) {
    return this.administratorService.create(createAdministratorDto);
  }

  @Get()
  findAllAdmins() {
    return this.administratorService.findAll();
  }

  @Get(':id')
  findOneAdmin(@Param('id') id: string) {
    return this.administratorService.findOne(+id);
  }

  @Get('/dni/:dni')
  findAdminByDNI(@Param('dni') dni: string) {
    return this.administratorService.findByDNI(+dni);
  }

  @Patch(':id')
  updateAdmin(@Param('id') id: string, @Body() updateAdministratorDto: UpdateAdministratorDto) {
    return this.administratorService.update(+id, updateAdministratorDto);
  }

  @Delete(':id')
  removeAdmin(@Param('id') id: string) {
    return this.administratorService.remove(+id);
  }
}
