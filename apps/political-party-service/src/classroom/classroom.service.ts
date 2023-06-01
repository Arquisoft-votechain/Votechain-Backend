import { Injectable, NotFoundException } from '@nestjs/common';
import { RequestClassroomDto } from './dto/request-classroom.dto';
import { ResponseClassroomDto } from './dto/response-classroom.dto';
import { Classroom } from './entities/classroom.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { classToPlain, plainToClass } from 'class-transformer';

@Injectable()
export class ClassroomService {

  constructor(
    @InjectRepository(Classroom)
    private readonly classroomRepository: Repository<Classroom>,
  ){  }

  /*create(createClassroomDto: RequestClassroomDto) {
    return 'This action adds a new classroom';
  }*/

  async findAll() {
    const classrooms = await this.classroomRepository.find({});
    return plainToClass(ResponseClassroomDto, classrooms);
  }

  async findOne(id: number) {
    const classroom = await this.classroomRepository.findOneBy({id});
    
    if(!classroom) throw new NotFoundException(`Classroom with id ${id} not found`);
    
    return plainToClass(ResponseClassroomDto, classroom);
  }

  /*update(id: number, updateClassroomDto: ResponseClassroomDto) {
    return `This action updates a #${id} classroom`;
  }

  remove(id: number) {
    return `This action removes a #${id} classroom`;
  }*/
}
