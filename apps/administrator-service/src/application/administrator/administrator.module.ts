import { Module } from '@nestjs/common';
import { AdministratorServiceImpl } from './services/administratorImpl.service';
import { AdministratorController } from '../../infrastructure/controllers/administrator.controller';
import { Administrator } from '../../domain/administrator/models/administrator.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [AdministratorController],
  providers: [AdministratorServiceImpl],
  imports:[
    TypeOrmModule.forFeature([Administrator]),
  ]
})
export class AdministratorModule {}
