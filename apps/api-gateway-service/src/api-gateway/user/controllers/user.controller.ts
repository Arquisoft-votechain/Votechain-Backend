import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, UseFilters } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { RequestUserDto } from "../models/user.dto";
import { HttpExceptionFilter } from "src/util/http-exception.filter";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('users')
@Controller('user')
@UseFilters(new HttpExceptionFilter())
export class UserController {
  
    constructor(@Inject('USER_SERVICE') private UserService: ClientProxy) {}

    @Post()
    createUser(@Body() createUserDto: RequestUserDto) {
        return this.UserService.send({ cmd: 'createUser' }, createUserDto);
    }
  
    @Get()
    findAllUsers() {
        return this.UserService.send({ cmd: 'findAllUsers' }, '');
    }
  
    @Get(':id')
    findOneUser(@Param('id') id: string) {
        return this.UserService.send({ cmd: 'findOneUser' }, id);
    }
  
    @Patch(':id')
    updateUser(@Param('id') id: string, @Body() updateUserDto: RequestUserDto) {
        return this.UserService.send({ cmd: 'updateUser' }, {id, updateUserDto});
    }
  
    @Delete(':id')
    removeUser(@Param('id') id: string) {
        return this.UserService.send({ cmd: 'removeUser' }, id);
    }
    
}