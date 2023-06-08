import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VoteServiceImpl } from '../../application/vote/services/voteImpl.service';
import { CreateVoteDto } from '../../application/vote/dto/create-vote.dto';
import { UpdateVoteDto } from '../../application/vote/dto/update-vote.dto';
import { MessagePattern } from '@nestjs/microservices';

@Controller('vote')
export class VoteController {
  constructor(private readonly voteService: VoteServiceImpl) {}

  @Post()
  @MessagePattern({ cmd: 'registerVote' })
  registerVote(data:{studentId: number, politicalPartyId: number} ) {
    const {studentId, politicalPartyId} = data;
    return this.voteService.registerVote(studentId, politicalPartyId);
  }

  @Get()
  @MessagePattern({cmd: 'findCountVotesByPoliticalPartyParticipantId'})
  findCountVotesByPoliticalPartyParticipantId(pppId: number){
    return this.voteService.findCountVotesByPoliticalPartyId(pppId);
  }

  @Get()
  findAllVotes() {
    return this.voteService.findAll();
  }

  @Get(':id')
  findOneVote(@Param('id') id: string) {
    return this.voteService.findOneVote(+id);
  }

  @Patch(':id')
  updateVote(@Param('id') id: string, @Body() updateVoteDto: UpdateVoteDto) {
    return this.voteService.update(+id, updateVoteDto);
  }

  @Delete(':id')
  removeVote(@Param('id') id: string) {
    return this.voteService.remove(+id);
  }
}
