import { Module } from '@nestjs/common';
import { ClassroomController } from 'src/infrastructure/index.infrastructure';
import { ClassroomServiceImpl } from '../index.application';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Classroom } from 'src/domain/index.domain';


@Module({
  controllers: [ClassroomController],
  providers: [ClassroomServiceImpl],
  imports:[
    TypeOrmModule.forFeature([Classroom])
  ]
})
export class ClassroomModule {}