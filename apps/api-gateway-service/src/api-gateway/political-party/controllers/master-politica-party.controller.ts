import { Controller, Get, Inject, Param, ParseIntPipe } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ApiTags } from "@nestjs/swagger";

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

  
}