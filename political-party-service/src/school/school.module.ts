import { Module } from '@nestjs/common';
import { SchoolService } from './school.service';
import { SchoolController } from './school.controller';
import { School } from './entities/school.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Classroom } from 'src/classroom/entities/classroom.entity';
import { MasterPoliticalParty } from 'src/master-political-party/entities/master-political-party.entity';

@Module({
  controllers: [SchoolController],
  providers: [SchoolService],
  imports:[
    TypeOrmModule.forFeature([School]),
    TypeOrmModule.forFeature([Classroom]),
    TypeOrmModule.forFeature([MasterPoliticalParty]),
  ]
})
export class SchoolModule {}
