import { Module } from '@nestjs/common';
import { StudentServiceImpl } from './services/studentImpl.service';
import { StudentController } from '../../infrastructure/controllers/student.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from '../../domain/student/models/student.entity';
import { UserClient } from 'src/shared/user/user.client';
import { ClassroomClient } from 'src/shared/classroom/classroom.client';

@Module({
  controllers: [StudentController],
  providers: [StudentServiceImpl, UserClient, ClassroomClient],
  imports:[
    TypeOrmModule.forFeature([Student]),
  ]
})
export class StudentModule {}
