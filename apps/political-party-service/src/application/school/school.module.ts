import { Module } from '@nestjs/common';
import { SchoolController } from 'src/infrastructure/index.infrastructure';
import { SchoolServiceImpl } from '../index.application';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Classroom, MasterPoliticalParty, School } from 'src/domain/index.domain';


@Module({
  controllers: [SchoolController],
  providers: [SchoolServiceImpl],
  imports:[
    TypeOrmModule.forFeature([School]),
    TypeOrmModule.forFeature([Classroom]),
    TypeOrmModule.forFeature([MasterPoliticalParty]),
  ]
})
export class SchoolModule {}