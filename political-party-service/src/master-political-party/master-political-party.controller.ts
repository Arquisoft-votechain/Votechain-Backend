import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { MasterPoliticalPartyService } from './master-political-party.service';
import { RequestMasterPoliticalPartyDto } from './dto/request-master-political-party.dto';
import { ResponseMasterPoliticalPartyDto } from './dto/response-master-political-party.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('master-political-party')
@Controller('master-political-party')
export class MasterPoliticalPartyController {
  constructor(private readonly masterPoliticalPartyService: MasterPoliticalPartyService) {}


  @Get()
  findAll() {
    return this.masterPoliticalPartyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.masterPoliticalPartyService.findOne(id);
  }

 

  
}
