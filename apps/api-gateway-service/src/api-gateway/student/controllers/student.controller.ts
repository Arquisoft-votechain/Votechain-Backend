import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, UseFilters } from "@nestjs/common";
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

    @Post(':studentId/politicalpartyparticipant/:politicalPartyId')
    registerVote(@Param('studentId', ParseIntPipe)studentId: number, @Param('politicalPartyId', ParseIntPipe)politicalPartyId: number) {
        return this.StudentService.send({ cmd: 'registerVote' }, {studentId, politicalPartyId});
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

    @Get('/classroom/:classroomId')
    findStudentsByClassroomId(@Param('classroomId') classroomId: any){
        return this.StudentService.send({cmd: 'findStudentsByClassroomId'},classroomId)
    }

    @Get(':studentId/classroom/:classroomId')
    findOneStudentByClassroomId(@Param('studentId') studentId: any, @Param('classroomId') classroomId: any){
        return this.StudentService.send({cmd: 'findOneStudentByClassroomId'},{studentId, classroomId});
    }

    @Get('/user/:userId')
    findStudentByUserId(@Param('userId') userId: string) {
        return this.StudentService.send({ cmd: 'findStudentByUserId' }, userId);
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