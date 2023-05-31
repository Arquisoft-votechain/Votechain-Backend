import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { MasterPoliticalPartyService } from './master-political-party.service';
import { RequestMasterPoliticalPartyDto } from './dto/request-master-political-party.dto';
import { ResponseMasterPoliticalPartyDto } from './dto/response-master-political-party.dto';
import { ApiTags } from '@nestjs/swagger';
import { PoliticalPartyParticipant } from 'src/political-party-participant/entities/political-party-participant.entity';
import { RequestPoliticalPartyParticipantDto } from 'src/political-party-participant/dto/request-political-party-participant.dto';

@ApiTags('master-political-party')
@Controller('master-political-party')
export class MasterPoliticalPartyController {
  constructor(private readonly masterPoliticalPartyService: MasterPoliticalPartyService) { }


  @Get()
  findAll() {
    return this.masterPoliticalPartyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.masterPoliticalPartyService.findOne(id);
  }

  @Post(':id/political-party-participant')
  createPoliticalPartyParticipantByMasterId(@Param('id', ParseIntPipe) id: number,
    @Query('electoral_process_id', ParseIntPipe) electoral_process_id: number,
    @Body() politicalPartyParticipant: RequestPoliticalPartyParticipantDto
  ) {
    return this.masterPoliticalPartyService.createPoliticalPartyParticipantByMasterId(id, electoral_process_id,politicalPartyParticipant);
  }

  @Delete(':master_political_partyId/political-party-participants/:id')
  deletePoliticalPartyParticipantByMasterIdAndId(
    @Param('master_political_partyId', ParseIntPipe) master_political_partyId: number,
    @Param('id', ParseIntPipe) id: number) {
    return this.masterPoliticalPartyService.deletePoliticalPartyParticipantByMasterIdAndAndId(master_political_partyId, id);
  }




}
