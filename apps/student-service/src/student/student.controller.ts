import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { MessagePattern } from '@nestjs/microservices';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

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
  findStudentByDNI(@Param('dni') dni: string) {
    return this.studentService.findByDNI(+dni);
  }


  @Patch(':id')
  @MessagePattern({ cmd: 'updateStudent' })
  updateStudent(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentService.update(+id, updateStudentDto);
  }

  @Delete(':id')
  @MessagePattern({ cmd: 'removeStudent' })
  removeStudent(@Param('id') id: string) {
    return this.studentService.remove(+id);
  }
}
