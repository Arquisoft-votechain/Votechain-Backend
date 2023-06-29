import { Controller,  } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ClassroomRequest, 
  ClassroomResponse, 
  MasterPoliticalRequest, 
  MasterPoliticalResponse, 
  SchoolRequest, 
  SchoolResponse, 
  SchoolServiceImpl } from 'src/application/index.application';


@Controller('schools')
export class SchoolController {
  constructor(private readonly schoolService: SchoolServiceImpl) { }

  //@Post()
  @MessagePattern({ cmd: 'createSchool' })
  async createSchool(requestSchoolDto: SchoolRequest): Promise<SchoolResponse> {
    return await this.schoolService.createSchool(requestSchoolDto);
  }

  //@Post(':id/classrooms')
  @MessagePattern({ cmd: 'createClassroomBySchoolId' })
  async createClassroomBySchoolId(data: { id: number, requestClassroomDto: ClassroomRequest }): Promise<ClassroomResponse> {
    const { id, requestClassroomDto } = data;
    return await this.schoolService.createClassroomBySchoolId(id, requestClassroomDto);
  }

  @MessagePattern({ cmd: 'createMasterPoliticalPartyBySchoolId' })
  async createMasterPoliticalPartyBySchoolId(data: { id: number, requestMasterPoliticalPartyDto: MasterPoliticalRequest }): Promise<MasterPoliticalResponse> {
    const { id, requestMasterPoliticalPartyDto } = data;
    return await this.schoolService.createMasterPoliticalPartyBySchoolId(id, requestMasterPoliticalPartyDto);
  }


  @MessagePattern({ cmd: 'findAllSchools' })
  async findAllSchools() {
    return await this.schoolService.getAllSchools();
  }

  @MessagePattern({ cmd: 'findOneSchool' })
  async findOneSchool(id: number): Promise<SchoolResponse> {
    return await this.schoolService.getSchoolById(id);
  }

  @MessagePattern({ cmd: 'findAllClassroomsBySchoolId' })
  async findAllClassroomsBySchoolId(id: number) {
    return await this.schoolService.getAllClassroomsBySchoolId(id);
  }

  @MessagePattern({ cmd: 'findAllStudentsBySchoolId' })
  async findAllStudentsBySchoolId(schoolId: number) {
    return await this.schoolService.getAllStudentsBySchoolId(schoolId);
  }

  @MessagePattern({ cmd: 'findAllMasterPoliticalPartiesBySchoolId' })
  async findAllMasterPoliticalPartiesBySchoolId(id: number) {
    return await this.schoolService.getAllMasterPoliticalPartiesBySchoolId(id);
  }

  @MessagePattern({ cmd: 'updateSchool' })
  async update(data: { id: number, requestSchoolDto: SchoolRequest }): Promise<SchoolResponse> {
    const { id, requestSchoolDto } = data;
    return await this.schoolService.updateSchoolById(id, requestSchoolDto);
  }

  //@Patch(':schoolId/classrooms/:id')
  @MessagePattern({ cmd: 'updateClassroomBySchoolIdAndId' })
  async updateClassroomBySchoolIdAndId(data: {
    schoolId: number,
    id: number,
    requestClassroomDto: ClassroomRequest
  }): Promise<ClassroomResponse> {
    const { schoolId, id, requestClassroomDto } = data;
    return await this.schoolService.updateClassroomBySchoolIdAndId(schoolId, id, requestClassroomDto);
  }


  @MessagePattern({ cmd: 'updateMasterPPBySchoolIdAndId' })
  async updateMasterPPBySchoolIdAndId(data: {
    schoolId: number,
    id: number,
    requestMasterPoliticalPartyDto: MasterPoliticalRequest
  }): Promise<MasterPoliticalResponse> {
    const { schoolId, id, requestMasterPoliticalPartyDto } = data;
    return await this.schoolService.updateMasterPoliticalBySchoolIdAndId(schoolId, id, requestMasterPoliticalPartyDto);
  }

  @MessagePattern({ cmd: 'removeSchool' })
  async remove(id: number): Promise<SchoolResponse> {
    return await this.schoolService.deleteSchoolById(id);
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
    }): Promise<MasterPoliticalResponse> {
    const { schoolId, id } = data;
    return await this.schoolService.deleteMasterPoliticalBySchoolIdAndId(schoolId, id);
  }
}
