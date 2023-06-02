import { Module } from '@nestjs/common';
import { AdministratorService } from './administrator.service';
import { AdministratorController } from './administrator.controller';
import { Administrator } from './entities/administrator.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [AdministratorController],
  providers: [AdministratorService],
  imports:[
    TypeOrmModule.forFeature([Administrator]),
  ]
})
export class AdministratorModule {}
