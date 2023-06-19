import { Module } from '@nestjs/common';
import { SchoolController } from 'src/infrastructure/index.infrastructure';
import { SchoolServiceImpl } from '../index.application';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Classroom, MasterPoliticalParty, School } from 'src/domain/index.domain';
import { StudentClient } from 'src/shared/student/student.client';


@Module({
  controllers: [SchoolController],
  providers: [SchoolServiceImpl,StudentClient],
  imports:[
    TypeOrmModule.forFeature([School]),
    TypeOrmModule.forFeature([Classroom]),
    TypeOrmModule.forFeature([MasterPoliticalParty]),
  ]
})
export class SchoolModule {}