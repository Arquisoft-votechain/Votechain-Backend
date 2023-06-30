import { Module } from '@nestjs/common';
import { StudentServiceImpl } from './services/studentImpl.service';
import { StudentController } from '../../infrastructure/controllers/student.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from '../../domain/student/models/student.entity';
import { UserClient } from 'src/shared/user/user.client';
import { ClassroomClient } from 'src/shared/classroom/classroom.client';
import { Vote } from 'src/domain/index.domain';

@Module({
  controllers: [StudentController],
  providers: [StudentServiceImpl, UserClient, ClassroomClient],
  imports:[
    TypeOrmModule.forFeature([Student]),
    TypeOrmModule.forFeature([Vote])
  ]
})
export class StudentModule {}
