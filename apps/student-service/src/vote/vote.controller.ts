import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VoteService } from './vote.service';
import { CreateVoteDto } from './dto/create-vote.dto';
import { UpdateVoteDto } from './dto/update-vote.dto';

@Controller('api/vote')
export class VoteController {
  constructor(private readonly voteService: VoteService) {}

  @Post()
  createVote(@Body() createVoteDto: CreateVoteDto) {
    return this.voteService.create(createVoteDto);
  }

  @Get()
  findAllVotes() {
    return this.voteService.findAll();
  }

  @Get(':id')
  findOneVote(@Param('id') id: string) {
    return this.voteService.findOne(+id);
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
