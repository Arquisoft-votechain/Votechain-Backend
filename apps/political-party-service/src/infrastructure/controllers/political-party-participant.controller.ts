import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { PoliticalPartyParticipantServiceImpl } from 'src/application/index.application';


@Controller('political-party-participant')
export class PoliticalPartyParticipantController {
  constructor(private readonly politicalPartyParticipantService: PoliticalPartyParticipantServiceImpl) {}

  @MessagePattern({cmd: 'findByMasterIdElectoralProcessIdAndDate'})
  async findByMasterIdElectoralProcessIdAndDate(data: {masterId: number, electoralId: number, assignedDate: Date}){
    const {masterId, electoralId, assignedDate} = data;
    return await this.politicalPartyParticipantService.findByMasterIdElectoralProcessIdAndDate(masterId,electoralId,assignedDate);
  }

  @MessagePattern({cmd: 'assignStudentToPoliticalPartyParticipant'})
  async assignStudentToPoliticalPartyParticipant(data: {politicalParticipantId: number, studentId: number})
  {
    const {politicalParticipantId, studentId} = data;
    return await this.politicalPartyParticipantService.assignStudentToPoliticalPartyParticipant(politicalParticipantId,studentId);
  }

  @MessagePattern({cmd: 'unassignStudentToPoliticalPartyParticipant'})
  async unassignStudentToPoliticalPartyParticipant(data: {politicalParticipantId: number, studentId: number})
  {
    const {politicalParticipantId, studentId} = data;
    return await this.politicalPartyParticipantService.unassignStudentToPoliticalPartyParticipant(politicalParticipantId,studentId);
  }

  @MessagePattern({cmd: 'getPoliticalPartyParticipantsByElectoralId'})
  async getPoliticalPartyParticipantsByElectoralId(electoralId: number)
  {
    return await this.politicalPartyParticipantService.getPoliticalPartyParticipantsByElectoralId(electoralId);
  }
}
