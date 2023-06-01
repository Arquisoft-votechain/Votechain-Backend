import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { SchoolService } from './school.service';
import { RequestSchoolDto } from './dto/request-school.dto';
import { ResponseSchoolDto } from './dto/response-school.dto';
import { RequestClassroomDto } from 'src/classroom/dto/request-classroom.dto';
import { ApiTags } from '@nestjs/swagger';
import { RequestMasterPoliticalPartyDto } from 'src/master-political-party/dto/request-master-political-party.dto';
import { MessagePattern } from '@nestjs/microservices';
import * as request from 'supertest';

@ApiTags('school')
@Controller('school')
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) { }

  //@Post()
  @MessagePattern({ cmd: 'createSchool' })
  createSchool(@Body() requestSchoolDto: RequestSchoolDto): Promise<ResponseSchoolDto> {
    return this.schoolService.create(requestSchoolDto);
  }

  //@Post(':id/classrooms')
  @MessagePattern({ cmd: 'createClassroomBySchoolId' })
  createClassroomBySchoolId(data: { id: number, requestClassroomDto: RequestClassroomDto }): Promise<ResponseSchoolDto> {
    const { id, requestClassroomDto } = data;
    return this.schoolService.createClassroomBySchoolId(id, requestClassroomDto);
  }

  @MessagePattern({ cmd: 'createMasterPoliticalPartyBySchoolId' })
  createMasterPoliticalPartyBySchoolId(data: { id: number, requestMasterPoliticalPartyDto: RequestMasterPoliticalPartyDto }) {
    const { id, requestMasterPoliticalPartyDto } = data;
    return this.schoolService.createMasterPoliticalPartyBySchoolId(id, requestMasterPoliticalPartyDto);
  }


  @MessagePattern({ cmd: 'findAllSchools' })
  findAllSchools() {
    return this.schoolService.findAll();
  }

  @MessagePattern({ cmd: 'findOneSchool' })
  findOneSchool(id: number) {
    return this.schoolService.findOne(id);
  }

  @MessagePattern({ cmd: 'findAllClassroomsBySchoolId' })
  findAllClassroomsBySchoolId(id: number) {
    return this.schoolService.findAllClassroomsBySchoolId(id);
  }

  @MessagePattern({ cmd: 'findAllMasterPoliticalPartiesBySchoolId' })
  findAllMasterPoliticalPartiesBySchoolId(id: number) {
    return this.schoolService.findAllMasterPoliticalPartiesBySchoolId(id);
  }

  @MessagePattern({ cmd: 'updateSchool' })
  update(data: { id: number, requestSchoolDto: RequestSchoolDto }) {
    const { id, requestSchoolDto } = data;
    return this.schoolService.update(id, requestSchoolDto);
  }

  //@Patch(':schoolId/classrooms/:id')
  @MessagePattern({ cmd: 'updateClassroomBySchoolIdAndId' })
  updateClassroomBySchoolIdAndId(data: {
    schoolId: number,
    id: number,
    requestClassroomDto: RequestClassroomDto
  }) {
    const { schoolId, id, requestClassroomDto } = data;
    return this.schoolService.updateClassroomBySchoolIdAndId(schoolId, id, requestClassroomDto);
  }


  @MessagePattern({ cmd: 'updateMasterPPBySchoolIdAndId' })
  updateMasterPPBySchoolIdAndId(data: {
    schoolId: number,
    id: number,
    requestMasterPoliticalPartyDto: RequestMasterPoliticalPartyDto
  }) {
    const { schoolId, id, requestMasterPoliticalPartyDto } = data;
    return this.schoolService.updateMasterPPBySchoolIdAndId(schoolId, id, requestMasterPoliticalPartyDto);
  }

  @MessagePattern({ cmd: 'removeSchool' })
  remove(id: number) {
    return this.schoolService.remove(id);
  }

  @MessagePattern({ cmd: 'deleteClassroomBySchoolIdAndId' })
  deleteClassroomByIdAndSchoolId(data: {
    schoolId: number,
    id: number
  }) {
    const { schoolId, id } = data;
    return this.schoolService.deleteClassroomBySchoolIdAndId(schoolId, id);
  }

  @MessagePattern({ cmd: 'deleteMasterPPBySchoolIdAndId' })
  deleteMasterPPBySchoolIdAndId(
    data: {
      schoolId: number,
      id: number
    }) {
    const { schoolId, id } = data;
    return this.schoolService.deleteMasterPPBySchoolIdAndId(schoolId, id);
  }
}
