import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { MasterPoliticalPartyServiceImpl, PoliticalPartyPanticipantRequest } from 'src/application/index.application';


@Controller('master-political-party')
export class MasterPoliticalPartyController {
  constructor(private readonly masterPoliticalPartyService: MasterPoliticalPartyServiceImpl) { }


  @MessagePattern({ cmd: 'findAllMasterPPs' })
  async findAll() {
    return await this.masterPoliticalPartyService.getAllMasterPoliticalParties();
  }

  @MessagePattern({ cmd: 'findOneMasterPP' })
  async findOne(id: number) {
    return await this.masterPoliticalPartyService.getMasterPoliticalPartyById(id);
  }

  @MessagePattern({ cmd: 'createPoliticalPartyParticipantByMasterIdAndEpId' })
  async createPoliticalPartyParticipantByMasterIdAndEpId(data: {
    id: number,
    electoralId: number,
    politicalPartyParticipant: PoliticalPartyPanticipantRequest
  }
  ) {
    const { id, electoralId, politicalPartyParticipant } = data;
    return await this.masterPoliticalPartyService.createPoliticalPartyParticipantByMasterIdAndEpId(id, electoralId, politicalPartyParticipant);
  }

  @MessagePattern({ cmd: 'deletePoliticalPartyParticipantByMasterIdAndId' })
  async deletePoliticalPartyParticipantByMasterIdAndId(
    data: { master_political_partyId: number, id: number }
  ) {
    const {master_political_partyId, id} = data;
    return await this.masterPoliticalPartyService.deletePoliticalPartyParticipantByMasterIdAndAndId(master_political_partyId, id);
  }

}
