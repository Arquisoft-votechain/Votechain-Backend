import { Module } from '@nestjs/common';
import { AdministratorServiceImpl } from './services/administratorImpl.service';
import { AdministratorController } from '../../infrastructure/controllers/administrator.controller';
import { Administrator } from '../../domain/administrator/models/administrator.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserClient } from 'src/shared/user/user.client';
import { SchoolClient } from 'src/shared/school/school.client';

@Module({
  controllers: [AdministratorController],
  providers: [AdministratorServiceImpl,UserClient,SchoolClient],
  imports:[
    TypeOrmModule.forFeature([Administrator]),
  ]
})
export class AdministratorModule {}
