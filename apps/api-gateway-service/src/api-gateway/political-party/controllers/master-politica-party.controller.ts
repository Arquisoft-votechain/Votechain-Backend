import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Query } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ApiTags } from "@nestjs/swagger";
import { PoliticalPartyPanticipantRequest } from "../dtos/political-party-participant.dto";

@ApiTags('master-political-parties')
@Controller('master-political-parties')
export class MasterPoliticalPartyController {
    constructor(@Inject('POLITICAL_PARTY_SERVICE') private client: ClientProxy) { }


  @Get()
  findAllMasterPPs() {
    return this.client.send({ cmd: 'findAllMasterPPs' }, '');
  }

  @Get(':id')
  findOnMasterPP(@Param('id', ParseIntPipe) id: number) {
    return this.client.send({ cmd: 'findOneMasterPP' }, id);
  }

  @Post(':id/political-party-participant')
  createPoliticalPartyParticipantByMasterId(@Param('id', ParseIntPipe) id: number,
    @Query('electoral_process_id', ParseIntPipe) electoralId: number,
    @Body() politicalPartyParticipant: PoliticalPartyPanticipantRequest
  ) {
    return this.client.send({cmd: 'createPoliticalPartyParticipantByMasterIdAndEpId'},{id, electoralId,politicalPartyParticipant});
  }

  @Delete(':masterId/political-party-participants/:id')
  deletePoliticalPartyParticipantByMasterIdAndId(
    @Param('master_political_partyId', ParseIntPipe) masterId: number,
    @Param('id', ParseIntPipe) id: number) {
    return this.client.send({cmd: 'deletePoliticalPartyParticipantByMasterIdAndId'},{masterId,id});
  }

  @Get(':masterId/political-party-participants')
  async findByMasterIdElectoralProcessIdAndDate(
    @Param('masterId', ParseIntPipe) masterId: number,
    @Query('electoralId', ParseIntPipe) electoralId: number,
    @Query('assigned_date') assignedDate: Date,
  ){
    return await this.client.send({cmd: 'findByMasterIdElectoralProcessIdAndDate'},{masterId,electoralId,assignedDate});
  }

  
}