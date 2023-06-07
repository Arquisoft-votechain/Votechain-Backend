import { Controller, Delete, Get, Inject, Param, ParseIntPipe, Post } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('political-party-participants')
@Controller('political-party-participants')
export class PoliticalPartyParticipantController {
  constructor(@Inject('POLITICAL_PARTY_SERVICE') private client: ClientProxy) { }

  @Post(':politicalParticipantId/students/:studentId')
  async assignStudentToPoliticalPartyParticipant(
    @Param('politicalParticipantId',ParseIntPipe) politicalParticipantId: number,
    @Param('studentId',ParseIntPipe) studentId: number) {
    return this.client.send({cmd:'assignStudentToPoliticalPartyParticipant'},{politicalParticipantId, studentId});
  }

  @Delete(':politicalParticipantId/students/:studentId')
  async unassignStudentToPoliticalPartyParticipant(
    @Param('politicalParticipantId',ParseIntPipe) politicalParticipantId: number,
    @Param('studentId',ParseIntPipe) studentId: number) {
    return this.client.send({cmd:'unassignStudentToPoliticalPartyParticipant'},{politicalParticipantId, studentId});
  }
  /*@Get()
  findAllMasterPPs() {
    return this.client.send({ cmd: 'findAllMasterPPs' }, '');
  }*/


}