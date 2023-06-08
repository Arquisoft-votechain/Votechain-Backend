import { Module } from '@nestjs/common';
import { StudentServiceImpl } from './services/studentImpl.service';
import { StudentController } from '../../infrastructure/controllers/student.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from '../../domain/student/models/student.entity';

@Module({
  controllers: [StudentController],
  providers: [StudentServiceImpl],
  imports:[
    TypeOrmModule.forFeature([Student]),
  ]
})
export class StudentModule {}
