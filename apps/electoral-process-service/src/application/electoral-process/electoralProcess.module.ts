import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { PoliticalPartyClient } from '../../shared/school/school.client';

import { ElectoralProcessController } from 'src/infrastructure/index.controller';
import { ElectoralProcessServiceImpl } from './services/electoralProcessImpl.service';
import { ElectoralProcess, ProcessAdmin, ProcessStudent } from 'src/domain/index.domain';
import { AdminClient } from 'src/shared/administrator/administrator.client';
import { StudentClient } from 'src/shared/student/student.client';

@Module({
  controllers: [ElectoralProcessController],
  providers: [
    PoliticalPartyClient,
    AdminClient,
    StudentClient,
    ElectoralProcessServiceImpl,    
  ],
  imports:[
    TypeOrmModule.forFeature([ElectoralProcess]),
    TypeOrmModule.forFeature([ProcessAdmin]),
    TypeOrmModule.forFeature([ProcessStudent])
  ]
})
export class ElectoralProcessModule {}
