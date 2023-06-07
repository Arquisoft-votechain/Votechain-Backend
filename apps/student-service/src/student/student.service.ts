import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Repository } from 'typeorm';
import { Student } from './entities/student.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentResponse } from './dto/student.response';



@Injectable()
export class StudentService {

  constructor(@InjectRepository(Student) private studentRepository: Repository<Student>){}

  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    const newStudent = await this.studentRepository.save({
      name: createStudentDto.name,
      lastName: createStudentDto.lastName,
      age: createStudentDto.age,
      identifier: createStudentDto.identifier,
      dni: createStudentDto.dni,
    });
    return newStudent;
    //return 'This action adds a new student';
  }

  async findAll(): Promise<Student[]> {
    return this.studentRepository.find();
  }

  async findOne(id: number){
    try{
      const studentExist =  await this.studentRepository.findOne({where: {id}});

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

  async update(id: any, updateStudentDto: Partial<UpdateStudentDto>) {
    const studentExist =  await this.studentRepository.findOne({where: {id}});

    if (!studentExist) throw new NotFoundException(`Student with id ${id} is not registered`);
    const updatedStudent = Object.assign(studentExist,updateStudentDto);

    return await this.studentRepository.save(updatedStudent);
    //return `This action updates a #${id} student`;
  }

  async remove(id: any): Promise<void> {
    const studentExist =  await this.studentRepository.findOne({where: {id}});

    if (!studentExist) throw new NotFoundException(`Student with id ${id} is not registered`);

    await this.studentRepository.remove(id);
    //return `This action removes a #${id} student`;
  }
}
