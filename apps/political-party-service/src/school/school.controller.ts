import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { SchoolService } from './school.service';
import { RequestSchoolDto } from './dto/request-school.dto';
import { ResponseSchoolDto } from './dto/response-school.dto';
import { RequestClassroomDto } from 'src/classroom/dto/request-classroom.dto';
import { ApiTags } from '@nestjs/swagger';
import { RequestMasterPoliticalPartyDto } from 'src/master-political-party/dto/request-master-political-party.dto';
import { MessagePattern } from '@nestjs/microservices';
import * as request from 'supertest';
import { SchoolResponse } from './dto/school.reponse';
import { ClassroomResponse } from 'src/classroom/dto/classroom.response';
import { MasterPoliticalPartyResponse } from 'src/master-political-party/dto/master-political-party.response';


@Controller('schools')
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) { }

  //@Post()
  @MessagePattern({ cmd: 'createSchool' })
  async createSchool(@Body() requestSchoolDto: RequestSchoolDto): Promise<SchoolResponse> {
    return await this.schoolService.createSchool(requestSchoolDto);
  }

  //@Post(':id/classrooms')
  @MessagePattern({ cmd: 'createClassroomBySchoolId' })
  async createClassroomBySchoolId(data: { id: number, requestClassroomDto: RequestClassroomDto }): Promise<ClassroomResponse> {
    const { id, requestClassroomDto } = data;
    return await this.schoolService.createClassroomBySchoolId(id, requestClassroomDto);
  }

  @MessagePattern({ cmd: 'createMasterPoliticalPartyBySchoolId' })
  async createMasterPoliticalPartyBySchoolId(data: { id: number, requestMasterPoliticalPartyDto: RequestMasterPoliticalPartyDto }): Promise<MasterPoliticalPartyResponse> {
    const { id, requestMasterPoliticalPartyDto } = data;
    return await this.schoolService.createMasterPoliticalPartyBySchoolId(id, requestMasterPoliticalPartyDto);
  }


  @MessagePattern({ cmd: 'findAllSchools' })
  async findAllSchools() {
    return await this.schoolService.findAllSchools();
  }

  @MessagePattern({ cmd: 'findOneSchool' })
  async findOneSchool(id: number): Promise<SchoolResponse> {
    return await this.schoolService.findOneSchoolById(id);
  }

  @MessagePattern({ cmd: 'findAllClassroomsBySchoolId' })
  async findAllClassroomsBySchoolId(id: number) {
    return await this.schoolService.findAllClassroomsBySchoolId(id);
  }

  @MessagePattern({ cmd: 'findAllMasterPoliticalPartiesBySchoolId' })
  async findAllMasterPoliticalPartiesBySchoolId(id: number) {
    return await this.schoolService.findAllMasterPoliticalPartiesBySchoolId(id);
  }

  @MessagePattern({ cmd: 'updateSchool' })
  async update(data: { id: number, requestSchoolDto: RequestSchoolDto }): Promise<SchoolResponse> {
    const { id, requestSchoolDto } = data;
    return await this.schoolService.updateSchoolById(id, requestSchoolDto);
  }

  //@Patch(':schoolId/classrooms/:id')
  @MessagePattern({ cmd: 'updateClassroomBySchoolIdAndId' })
  async updateClassroomBySchoolIdAndId(data: {
    schoolId: number,
    id: number,
    requestClassroomDto: RequestClassroomDto
  }): Promise<ClassroomResponse> {
    const { schoolId, id, requestClassroomDto } = data;
    return await this.schoolService.updateClassroomBySchoolIdAndId(schoolId, id, requestClassroomDto);
  }


  @MessagePattern({ cmd: 'updateMasterPPBySchoolIdAndId' })
  async updateMasterPPBySchoolIdAndId(data: {
    schoolId: number,
    id: number,
    requestMasterPoliticalPartyDto: RequestMasterPoliticalPartyDto
  }): Promise<MasterPoliticalPartyResponse> {
    const { schoolId, id, requestMasterPoliticalPartyDto } = data;
    return await this.schoolService.updateMasterPPBySchoolIdAndId(schoolId, id, requestMasterPoliticalPartyDto);
  }

  @MessagePattern({ cmd: 'removeSchool' })
  async remove(id: number): Promise<SchoolResponse> {
    return await this.schoolService.removeSchoolById(id);
  }

  @MessagePattern({ cmd: 'deleteClassroomBySchoolIdAndId' })
  async deleteClassroomByIdAndSchoolId(data: {
    schoolId: number,
    id: number
  }): Promise<ClassroomResponse> {
    const { schoolId, id } = data;
    return await this.schoolService.deleteClassroomBySchoolIdAndId(schoolId, id);
  }

  @MessagePattern({ cmd: 'deleteMasterPPBySchoolIdAndId' })
  async deleteMasterPPBySchoolIdAndId(
    data: {
      schoolId: number,
      id: number
    }): Promise<MasterPoliticalPartyResponse> {
    const { schoolId, id } = data;
    return await this.schoolService.deleteMasterPPBySchoolIdAndId(schoolId, id);
  }
}
