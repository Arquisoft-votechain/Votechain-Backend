import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, UseFilters } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { RequestAdministratorDto } from "../models/administrator.dto";
import { ApiTags } from "@nestjs/swagger";
import { HttpExceptionFilter } from "src/util/http-exception.filter";

@ApiTags('administrators')
@Controller('administrator')
@UseFilters(new HttpExceptionFilter())
export class AdministratorController {
  
    constructor(@Inject('ADMINISTRATOR_SERVICE') private administratorService: ClientProxy) {}

    @Post()
    createAdmin(@Body() createAdministratorDto: RequestAdministratorDto) {
        return this.administratorService.send({ cmd: 'createAdmin' }, createAdministratorDto);
    }
  
    @Get()
    findAllAdmins() {
        return this.administratorService.send({ cmd: 'findAllAdmins' }, '');
    }
  
    @Get(':id')
    findOneAdmin(@Param('id') id: string) {
        return this.administratorService.send({ cmd: 'findOneAdmin' }, id);
    }
  
    @Get('/dni/:dni')
    findAdminByDNI(@Param('dni') dni: string) {
        return this.administratorService.send({ cmd: 'findAdminByDNI' }, dni);
    }

    @Get('/user/:userId')
    findAdminByUserId(@Param('userId') userId: string) {
        return this.administratorService.send({ cmd: 'findAdminByUserId' }, userId);
    }
  
    @Patch(':id')
    updateAdmin(@Param('id') id: string, @Body() updateAdministratorDto: RequestAdministratorDto) {
        return this.administratorService.send({ cmd: 'updateAdmin' }, {id, updateAdministratorDto});
    }
  
    @Delete(':id')
    removeAdmin(@Param('id') id: string) {
        return this.administratorService.send({ cmd: 'removeAdmin' }, id);
    }
}