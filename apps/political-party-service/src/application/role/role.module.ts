import { Module } from '@nestjs/common';
import { RoleController } from 'src/infrastructure/index.infrastructure';
import {  RoleServiceImpl } from '../index.application';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/domain/index.domain';


@Module({
  controllers: [RoleController],
  providers: [RoleServiceImpl],
  imports:[
    TypeOrmModule.forFeature([Role])
  ]
})
export class RoleModule {}