import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { SchoolService } from './school.service';
import { RequestSchoolDto } from './dto/request-school.dto';
import { ResponseSchoolDto } from './dto/response-school.dto';
import { RequestClassroomDto } from 'src/classroom/dto/request-classroom.dto';
import { ApiTags } from '@nestjs/swagger';
import { RequestMasterPoliticalPartyDto } from 'src/master-political-party/dto/request-master-political-party.dto';

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

  @Post(':id/master-political-parties')
  createMasterPoliticalPartyBySchoolId(@Param('id',ParseIntPipe) id: number, @Body() requestMasterPoliticalPartyDto: RequestMasterPoliticalPartyDto){
    return this.schoolService.createMasterPoliticalPartyBySchoolId(id,requestMasterPoliticalPartyDto);
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

  @Get(':id/master-political-parties')
  findAllMasterPoliticalPartiesBySchoolId(@Param('id',ParseIntPipe) id: number){
    return this.schoolService.findAllMasterPoliticalPartiesBySchoolId(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() requestSchoolDto: RequestSchoolDto) {
    return this.schoolService.update(id, requestSchoolDto);
  }

  @Patch(':schoolId/classrooms/:id')
  updateClassroomBySchoolIdAndId(@Param('schoolId',ParseIntPipe) schoolId: number, 
    @Param('id',ParseIntPipe) id: number,
    @Body() requestClassroomDto: RequestClassroomDto) {
    return this.schoolService.updateClassroomBySchoolIdAndId(schoolId, id,requestClassroomDto);
  }

  @Patch(':schoolId/master-political-parties/:id')
  updateMasterPPBySchoolIdAndId(@Param('schoolId',ParseIntPipe) schoolId: number, 
    @Param('id',ParseIntPipe) id: number,
    @Body() requestMasterPoliticalPartyDto: RequestMasterPoliticalPartyDto) {
    return this.schoolService.updateMasterPPBySchoolIdAndId(schoolId, id,requestMasterPoliticalPartyDto);
  }

  @Delete(':id')
  remove(@Param('id',ParseIntPipe) id: number) {
    return this.schoolService.remove(id);
  }

  @Delete(':schoolId/classrooms/:id')
  deleteClassroomByIdAndSchoolId(
    @Param('schoolId',ParseIntPipe) schoolId: number, 
    @Param('id',ParseIntPipe) id: number) {
    return this.schoolService.deleteClassroomBySchoolIdAndId(schoolId, id);
  }

  @Delete(':schoolId/master-political-parties/:id')
  deleteMasterPPBySchoolIdAndId(
    @Param('schoolId',ParseIntPipe) schoolId: number, 
    @Param('id',ParseIntPipe) id: number) {
    return this.schoolService.deleteMasterPPBySchoolIdAndId(schoolId, id);
  }
}
