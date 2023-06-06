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
}
