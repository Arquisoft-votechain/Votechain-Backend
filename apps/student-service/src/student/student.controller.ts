import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Controller('api/student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  createStudent(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }

  @Get()
  findAllStudents() {
    return this.studentService.findAll();
  }

  @Get(':id')
  findOneStudent(@Param('id') id: string) {
    return this.studentService.findOne(+id);
  }

  @Get('/dni/:dni')
  findStudentByDNI(@Param('dni') dni: string) {
    return this.studentService.findByDNI(+dni);
  }


  @Patch(':id')
  updateStudent(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentService.update(+id, updateStudentDto);
  }

  @Delete(':id')
  removeStudent(@Param('id') id: string) {
    return this.studentService.remove(+id);
  }
}
