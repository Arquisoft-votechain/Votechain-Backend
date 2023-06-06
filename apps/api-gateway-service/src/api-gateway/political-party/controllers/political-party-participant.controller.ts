import { Controller, Get, Inject, Param, ParseIntPipe } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('political-party-participants')
@Controller('political-party-participants')
export class PoliticalPartyParticipantController {
    constructor(@Inject('POLITICAL_PARTY_SERVICE') private client: ClientProxy) { }


  /*@Get()
  findAllMasterPPs() {
    return this.client.send({ cmd: 'findAllMasterPPs' }, '');
  }*/

  
}