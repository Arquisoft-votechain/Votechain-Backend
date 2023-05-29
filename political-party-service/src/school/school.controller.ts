import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { SchoolService } from './school.service';
import { RequestSchoolDto } from './dto/request-school.dto';
import { ResponseSchoolDto } from './dto/response-school.dto';
import { RequestClassroomDto } from 'src/classroom/dto/request-classroom.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('school')
@Controller('school')
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}

  @Post()
  create(@Body() requestSchoolDto: RequestSchoolDto) {
    return this.schoolService.create(requestSchoolDto);
  }

  @Post(':id/classrooms')
  createClassroomBySchoolId(@Param('id',ParseIntPipe) id: number, @Body() requestClassroomDto: RequestClassroomDto){
    return this.schoolService.createClassroomBySchoolId(id,requestClassroomDto);
  }
  

  @Get()
  findAll() {
    return this.schoolService.findAll();
  }

  @Get(':id')
  findOne(@Param('id',ParseIntPipe) id: number) {
    return this.schoolService.findOne(id);
  }

  @Get(':id/classrooms')
  findAllClassroomsBySchoolId(@Param('id',ParseIntPipe) id: number){
    return this.schoolService.findAllClassroomsBySchoolId(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() requestSchoolDto: RequestSchoolDto) {
    return this.schoolService.update(id, requestSchoolDto);
  }

  @Patch(':id/classrooms/:classroomId')
  updateClassroomByIdAndSchoolId(@Param('id',ParseIntPipe) id: number, 
    @Param('classroomId',ParseIntPipe) classroomId: number,
    @Body() requestClassroomDto: RequestClassroomDto) {
    return this.schoolService.updateClassroomByIdAndSchoolId(id, classroomId,requestClassroomDto);
  }

  @Delete(':id')
  remove(@Param('id',ParseIntPipe) id: number) {
    return this.schoolService.remove(id);
  }

  @Delete(':id/classrooms/:classroomId')
  deleteClassroomByIdAndSchoolId(
    @Param('id',ParseIntPipe) id: number, 
    @Param('classroomId',ParseIntPipe) classroomId: number) {
    return this.schoolService.deleteClassroomByIdAndSchoolId(id, classroomId);
  }
}
