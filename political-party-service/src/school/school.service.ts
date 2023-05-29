import { Injectable, NotFoundException } from '@nestjs/common';
import { RequestSchoolDto } from './dto/request-school.dto';
import { ResponseSchoolDto } from './dto/response-school.dto';
import { School } from './entities/school.entity';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Classroom } from 'src/classroom/entities/classroom.entity';
import { RequestClassroomDto } from 'src/classroom/dto/request-classroom.dto';

@Injectable()
export class SchoolService {
  
  constructor(
    @InjectRepository(School)
    private readonly schoolRepository: Repository<School>,
    @InjectRepository(Classroom)
    private readonly classroomRepository: Repository<Classroom>,
  ){

  }

  async create(requestSchoolDto: RequestSchoolDto) {
    try{
      const school = this.schoolRepository.create(requestSchoolDto);
      await this.schoolRepository.save(school);
      
      return school;
    }catch(error){
      console.log(error)
    }
  }

  async createClassroomBySchoolId(id: number, requestClassroomDto: RequestClassroomDto) {
    
    const school = await this.schoolRepository.findOneBy({id});
    if(!school) throw new NotFoundException(`School with id ${id} not found`);

    const classroom = this.classroomRepository.create(requestClassroomDto);
    classroom.school = school;

    return await this.classroomRepository.save(classroom);
  }

  findAll() {
    return this.schoolRepository.find({});
  }

  async findOne(id: number) {
    const school = await this.schoolRepository.findOneBy({id});
    
    if(!school) throw new NotFoundException(`School with id ${id} not found`);
    
    return school;
  }

  async findAllClassroomsBySchoolId(id: number) {

    const school = await this.schoolRepository.findOneBy({id});
    
    if(!school) throw new NotFoundException(`School with id ${id} not found`);


    var clasrooms = [];

    clasrooms = await this.classroomRepository.find({
      where:{
        school:{
          id:id
        }
      }
    })

    return clasrooms;
  }

  async update(id: number, requestSchoolDto: RequestSchoolDto) {
    
    const school = await this.schoolRepository.preload({
      id: id,
      ...requestSchoolDto
    })

    if( !school) throw new NotFoundException(`School with id ${id} not found`);

    return await this.schoolRepository.save(school);
  }

  async updateClassroomByIdAndSchoolId(id: number, clasroomId: number, requestClassroomDto: RequestClassroomDto) {
    const school = await this.schoolRepository.findOneBy({id});
    
    if(!school) throw new NotFoundException(`School with id ${id} not found`);

    const classroom = await this.classroomRepository.findOneBy({
      id: clasroomId,
      school:{
        id:id
      }
    })

    if(!classroom) throw new NotFoundException(`Classroom with id ${clasroomId} not found`);

    const clasroomUpdated = await this.classroomRepository.preload({
      id: classroom.id,
      school: classroom.school,
      ...requestClassroomDto
    })

    return await this.classroomRepository.save(clasroomUpdated);

  }

  async remove(id: number) {
    const school = await this.schoolRepository.findOneBy({id});
    
    if(!school) throw new NotFoundException(`School with id ${id} not found`);

    await this.schoolRepository.remove(school);
  }

  async deleteClassroomByIdAndSchoolId(id: number, classroomId: number) {
    const school = await this.schoolRepository.findOneBy({id});
    
    if(!school) throw new NotFoundException(`School with id ${id} not found`);

    const classroom = await this.classroomRepository.findOneBy({
      id: classroomId,
      school:{
        id:id
      }
    })

    if(!classroom) throw new NotFoundException(`Classroom with id ${classroomId} not found`);

    await this.classroomRepository.remove(classroom);
  }
}
