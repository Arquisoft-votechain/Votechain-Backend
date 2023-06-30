import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateStudentDto } from '../../application/student/dto/create-student.dto';
import { UpdateStudentDto } from '../../application/student/dto/update-student.dto';
import { MessagePattern } from '@nestjs/microservices';
import { Web3ServiceImpl, StudentServiceImpl } from 'src/application/index.application';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentServiceImpl, 
    private readonly web3Service: Web3ServiceImpl
    ) {}

  @Post()
  @MessagePattern({ cmd: 'createStudent' })
  createStudent(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }

  @Get()
  @MessagePattern({ cmd: 'findAllStudents' })
  findAllStudents() {
    return this.studentService.findAll();
  }

  @Get(':id')
  @MessagePattern({ cmd: 'findOneStudent' })
  findOneStudent(id: number) {
    return this.studentService.findOne(id);
  }

  @Get('/dni/:dni')
  @MessagePattern({ cmd: 'findStudentByDNI' })
  findStudentByDNI(dni: string) {
    return this.studentService.findByDNI(+dni);
  }

  @Get('/dni/:dni')
  @MessagePattern({ cmd: 'findStudentByUserId' })
  findStudentByUserId(userId: number) {
    return this.studentService.findByUserId(+userId);
  }

  @Get('/classroom/:classroomId')
  @MessagePattern({ cmd: 'findStudentsByClassroomId' })
  async findStudentsByClassroomId(classroomId: number){
    return await this.studentService.findAllByClassroomId(+classroomId);
  }

  @Get(':id/classroom/:classroomId')
  @MessagePattern({ cmd: 'findOneStudentByClassroomId' })
  async findOneStudentByClassroomId(data: {id: number, classroomId: number}){
    const {id, classroomId} = data
    return await this.studentService.findByClassroomId(id, classroomId);
  }

  @MessagePattern({ cmd: 'updateStudent' })
  updateStudent(data: {id: number, studenRequest: UpdateStudentDto}) {
    const {id,studenRequest} = data;
    return this.studentService.update(id, studenRequest);
  }

  @Delete(':id')
  @MessagePattern({ cmd: 'removeStudent' })
  removeStudent(@Param('id') id: string) {
    return this.studentService.remove(+id);
  }

  @MessagePattern({cmd: 'getStudentsByPoliticalPartyParticipantId'})
  async getStudentsByPoliticalPartyParticipantId(politicalParticipantId: number){
    return await this.studentService.getStudentsByPoliticalPartyParticipantId(politicalParticipantId);
  }

  @MessagePattern({cmd: 'checkStudentAlreadyVote'})
  async checkStudentAlreadyVote(data: {electoralProcessId: number, studentId: number}){
    const {electoralProcessId, studentId} = data;
    return await this.studentService.checkStudentAlreadyVote(electoralProcessId,studentId);
  }

}
