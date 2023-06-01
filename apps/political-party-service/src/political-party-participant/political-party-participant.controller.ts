import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PoliticalPartyParticipantService } from './political-party-participant.service';
import { RequestPoliticalPartyParticipantDto } from './dto/request-political-party-participant.dto';
import { ResponsePoliticalPartyParticipantDto } from './dto/response-political-party-participant.dto';

@Controller('political-party-participant')
export class PoliticalPartyParticipantController {
  constructor(private readonly politicalPartyParticipantService: PoliticalPartyParticipantService) {}

  @Post()
  create(@Body() createPoliticalPartyParticipantDto: RequestPoliticalPartyParticipantDto) {
    return this.politicalPartyParticipantService.create(createPoliticalPartyParticipantDto);
  }

  @Get()
  findAll() {
    return this.politicalPartyParticipantService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.politicalPartyParticipantService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePoliticalPartyParticipantDto: ResponsePoliticalPartyParticipantDto) {
    return this.politicalPartyParticipantService.update(+id, updatePoliticalPartyParticipantDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.politicalPartyParticipantService.remove(+id);
  }
}
