import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentDto } from '../dto/create-student.dto';
import { UpdateStudentDto } from '../dto/update-student.dto';
import { Repository } from 'typeorm';
import { Student } from '../../../domain/student/models/student.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentResponse } from '../dto/student.response';
import { StudentService } from 'src/domain/student/services/student.interface.service';
import { UserClient } from 'src/shared/user/user.client';
import { ClassroomClient } from 'src/shared/classroom/classroom.client';



@Injectable()
export class StudentServiceImpl implements StudentService {

  constructor(@InjectRepository(Student) private studentRepository: Repository<Student>,
  private readonly userClient: UserClient,
  private readonly classroomClient: ClassroomClient){}
  
  async getStudentsByPoliticalPartyParticipantId(politicalPartyParticipantId: number) {
    return await this.studentRepository.findBy({politicalPartyId: politicalPartyParticipantId});
  }

  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    const newStudent = await this.studentRepository.save({
      name: createStudentDto.name,
      lastName: createStudentDto.lastName,
      age: createStudentDto.age,
      identifier: createStudentDto.identifier,
      dni: createStudentDto.dni,
      userId: createStudentDto.userId,
      classroomId: createStudentDto.classroomId
    });
    return newStudent;
    //return 'This action adds a new student';
  }

  async findAll(): Promise<Student[]> {
    return this.studentRepository.find();
  }

  async findOne(id: number){
    try{
      const studentExist =  await this.studentRepository.findOne({where: {id: id}});

      if (!studentExist) {
      return new StudentResponse(`Student with id ${id} is not registered`);
      }
      return new StudentResponse('',studentExist);
    }catch(error){
      return new StudentResponse(`An error ocurred when finding ` + error.message);
    }
    //return `This action returns a #${id} student`;
  }

  async findByDNI(dniStudent: any){
    try{
      const studentExist =  await this.studentRepository.findOne(
      {
        where: {
          dni: dniStudent,
        }
      });

      if (!studentExist) {
        return new StudentResponse(`Student with dni ${dniStudent} is not registered`);
        }
    return new StudentResponse('',studentExist);
    }catch(error){
      return new StudentResponse(`An error ocurred when finding ` + error.message);
    }
  }

  async findByUserId(userId: any){
    try{
      const studentExist =  await this.studentRepository.findOne(
      {
        where: {
          userId: userId,
        }
      });

      if (!studentExist) {
        return new StudentResponse(`Student with User Id ${userId} is not registered`);
        }
    return new StudentResponse('',studentExist);
    }catch(error){
      return new StudentResponse(`An error ocurred when finding ` + error.message);
    }
  }

  async findByClassroomId(id: any, classroomId: any) {
    try{
      const ClassroomExist = this.classroomClient.getClassroomById(classroomId);
      if(!ClassroomExist)
      {
        return new StudentResponse(`Classroom with Id ${classroomId} is not registered`);
      }
      const studentExist =  await this.studentRepository.findOneBy(
        {
            id: id,
            classroomId: classroomId
          }
        );

      if (!studentExist) {
      return new StudentResponse(`Student with id ${id} and Classroom Id ${classroomId} is not registered`);
      }
      return new StudentResponse('',studentExist);
    }
    catch(error){
      return new StudentResponse(`An error ocurred when finding ` + error.message);
    }
  }
  
  async findAllByClassroomId(classroomId: number) {
    try{
      const ClassroomExist = this.classroomClient.getClassroomById(classroomId);
      if(!ClassroomExist)
      {
        return new StudentResponse(`Classroom with Id ${classroomId} is not registered`);
      }
      const listStudents = this.studentRepository.findBy({classroomId: classroomId})
      return listStudents;
    }
    catch(error){
      return new StudentResponse(`An error ocurred when finding ` + error.message);
    }
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    const studentExist =  await this.studentRepository.findOne({where: {id: id}});

    if (!studentExist) throw new NotFoundException(`Student with id ${id} is not registered`);
    const updatedStudent = Object.assign(studentExist,updateStudentDto);

    const resp = await this.studentRepository.save(updatedStudent);
    return new StudentResponse('',resp);
    //return `This action updates a #${id} student`;
  }

  async remove(id: any): Promise<void> {
    const studentExist =  await this.studentRepository.findOne({where: {id}});

    if (!studentExist) throw new NotFoundException(`Student with id ${id} is not registered`);

    await this.studentRepository.remove(id);
    //return `This action removes a #${id} student`;
  }
}
