import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UserServiceImpl, CreateUserDto, UpdateUserDto } from 'src/application/index.application';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserServiceImpl) {}

  @Post()
  @MessagePattern({ cmd: 'createUser' })
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @MessagePattern({ cmd: 'findAllUsers' })
  findAllUsers() {
    return this.userService.findAll();
  }

  @Get(':id')
  @MessagePattern({ cmd: 'findOneUser' })
  findOneUser(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  @MessagePattern({ cmd: 'updateUser' })
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @MessagePattern({ cmd: 'removeUser' })
  removeUser(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
