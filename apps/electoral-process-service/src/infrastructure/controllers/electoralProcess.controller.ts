import { Controller} from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ElectoralProcessRequest, ElectoralProcessResponse } from 'src/application/index.application';

import { ElectoralProcessServiceImpl } from 'src/application/electoral-process/services/electoralProcessImpl.service';
import { StudentBasicResponse } from 'src/shared/student/student.response';
import { AdministratorBasicResponse } from 'src/shared/administrator/administrator.response';

@Controller('electoral-process')
export class ElectoralProcessController {
  constructor(private readonly electoralProcessService: ElectoralProcessServiceImpl) { }

  ////SCHOOL
  @MessagePattern({ cmd: 'createElectoralProcessBySchoolId' })
  async createBySchoolId(data: { schoolId: number, requestElectoralProcessDto: ElectoralProcessRequest }) {
    const { schoolId, requestElectoralProcessDto } = data;
    return await this.electoralProcessService.createElectoralProcessBySchoolId(schoolId, requestElectoralProcessDto);
  }

  @MessagePattern({ cmd: 'findAllElectoralProcessesBySchoolId' })
  async findAllElectoralProcessesBySchoolId(schoolId: number) {
    return await this.electoralProcessService.findAllElectoralProcessesBySchoolId(schoolId);
  }
  
  @MessagePattern({ cmd: 'findOneElectoralProcessBySchoolIdAndId' })
  async findOneBySchoolIdAndId(data: { schoolId: number, id: number }): Promise<ElectoralProcessResponse> {
    const { schoolId, id } = data;
    return await this.electoralProcessService.findElectoralProcessBySchoolIdAndId(schoolId, id);
  }

  @MessagePattern({ cmd: 'updateElectoralProcessBySchoolIdAndId' })
  async updateBySchoolIdAndId(data: { schoolId: number, id: number, requestElectoralProcessDto: ElectoralProcessRequest }): Promise<ElectoralProcessResponse> {
    const { schoolId, id, requestElectoralProcessDto } = data;
    return await this.electoralProcessService.updateElectoralProcessBySchoolIdAndId(schoolId, id, requestElectoralProcessDto);
  }

  @MessagePattern({ cmd: 'removeElectoralProcessBySchoolIdAndId' })
  async removeBySchoolIdAndId(data: { schoolId: number, id: number }): Promise<ElectoralProcessResponse> {
    const { schoolId, id } = data;
    return await this.electoralProcessService.deleteElectoralProcessBySchoolIdAndId(schoolId, id);
  }

  //ELECTORAL PROCESS
  @MessagePattern({ cmd: 'assignStudentByIdAnElectoralProcessId' })
  async assignStudentByIdAnElectoralProcessId(data: {studentId: number, electoralId: number}) {
    const {studentId, electoralId} = data;
    return await this.electoralProcessService.assignStudentByIdAnElectoralProcessId(studentId,electoralId);
  }

  @MessagePattern({ cmd: 'unassignStudentByIdAnElectoralProcessId' })
  async unassignStudentByIdAnElectoralProcessId(data: {studentId: number, electoralId: number}){
    const {studentId, electoralId} = data;
    return await this.electoralProcessService.unassignStudentByIdAnElectoralProcessId(studentId,electoralId);
  }

  @MessagePattern({ cmd: 'assignAdministratorByIdAnElectoralProcessId' })
  async assignAdministratorByIdAnElectoralProcessId(data: {adminId: number, electoralId: number}) {
    const {adminId, electoralId} = data;
    return await this.electoralProcessService.assignAdministratorByIdAnElectoralProcessId(adminId,electoralId);
  }

  @MessagePattern({ cmd: 'unassignAdministratorByIdAnElectoralProcessId' })
  async unassignAdministratorByIdAnElectoralProcessId(data: {adminId: number, electoralId: number}) {
    const {adminId, electoralId} = data;
    return await this.electoralProcessService.unassignAdministratorByIdAnElectoralProcessId(adminId,electoralId);
  }

  @MessagePattern({ cmd: 'getStudentsByElectoralProcessId' })
  async getStudentsByElectoralProcessId(electoralId: number): Promise<StudentBasicResponse[]> {
    return await this.electoralProcessService.getStudentsByElectoralProcessId(electoralId);
  }

  @MessagePattern({ cmd: 'getAdministratorsByElectoralProcessId' })
  async getAdministratorsByElectoralProcessId(electoralId: number): Promise<AdministratorBasicResponse[]> {
    return await this.electoralProcessService.getAdministratorsByElectoralProcessId(electoralId);
  }

}
