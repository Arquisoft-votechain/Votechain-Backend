import { Module } from '@nestjs/common';
import { SchoolService } from './school.service';
import { SchoolController } from './school.controller';
import { School } from './entities/school.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Classroom } from 'src/classroom/entities/classroom.entity';

@Module({
  controllers: [SchoolController],
  providers: [SchoolService],
  imports:[
    TypeOrmModule.forFeature([School]),
    TypeOrmModule.forFeature([Classroom])
  ]
})
export class SchoolModule {}
