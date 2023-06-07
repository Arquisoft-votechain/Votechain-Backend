import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, UseFilters } from "@nestjs/common";
import { RequestStudentDto } from "../models/student.dto";
import { ClientProxy } from "@nestjs/microservices";
import { ApiTags } from "@nestjs/swagger";
import { HttpExceptionFilter } from "src/util/http-exception.filter";

@ApiTags('students')
@Controller('student')
@UseFilters(new HttpExceptionFilter())
export class StudentController {
  
    constructor(
        @Inject('STUDENT_SERVICE') private StudentService: ClientProxy,
        @Inject('ELECTORAL_PROCESS_SERVICE') private electoralProcessService: ClientProxy
        ) {}

    @Post()
    createStudent(@Body() createStudentDto: RequestStudentDto) {
        return this.StudentService.send({ cmd: 'createStudent' }, createStudentDto);
    }
  
    @Get()
    findAllStudents() {
        return this.StudentService.send({ cmd: 'findAllStudents' }, '');
    }
  
    @Get(':id')
    findOneStudent(@Param('id') id: string) {
        return this.StudentService.send({ cmd: 'findOneStudent' }, id);
    }

    @Get(':id/electoral-processes')
    getElectoralProcessesWhereStudentIsParticipant(@Param('id') id: string) {
        return this.electoralProcessService.send({ cmd: 'getElectoralProcessesWhereStudentIsParticipant' }, id);
    }
  
    @Get('/dni/:dni')
    findStudentByDNI(@Param('dni') dni: string) {
        return this.StudentService.send({ cmd: 'findStudentByDNI' }, dni);
    }
  
    @Patch(':id')
    updateStudent(@Param('id') id: string, @Body() updateStudentDto: RequestStudentDto) {
        return this.StudentService.send({ cmd: 'updateStudent' }, {id, updateStudentDto});
    }
  
    @Delete(':id')
    removeStudent(@Param('id') id: string) {
        return this.StudentService.send({ cmd: 'removeStudent' }, id);
    }
}