import { Module } from '@nestjs/common';
import { UserController } from '../../infrastructure/controllers/user.controller';
import { User } from '../../domain/user/models/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserServiceImpl } from '../index.application';

@Module({
  controllers: [UserController],
  providers: [UserServiceImpl],
  imports:[
    TypeOrmModule.forFeature([User]),
  ]
})
export class UserModule {}
