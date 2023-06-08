import { Injectable } from '@nestjs/common';
import { CreateVoteDto } from '../dto/create-vote.dto';
import { UpdateVoteDto } from '../dto/update-vote.dto';
import { Student, Vote, VoteService } from 'src/domain/index.domain';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { VoteResponse } from '../dto/vote.response';
import { PoliticalPartyParticipantClient } from 'src/shared/political-party-participant/political-party-participant.client';

@Injectable()
export class VoteServiceImpl implements VoteService{

  constructor(@InjectRepository(Vote) private voteRepository: Repository<Vote>, 
  @InjectRepository(Student) private studentRepository: Repository<Student>,
  private readonly politicalPartyClient: PoliticalPartyParticipantClient){}

  async registerVote(studentId: number, politicalPartyId: number){
    try{
      console.log('Antes Student');
    const studentIdentified = await this.studentRepository.findOne({where: {id: studentId}});
    if (!studentIdentified) {
      return new VoteResponse(`Student with id ${studentId} is not registered`);
    }
    console.log('Antes Political Party');
    const politicalPartyIdentified = await this.politicalPartyClient.getPoliticalPartyParticipantById(politicalPartyId);
    console.log(politicalPartyIdentified);
    if(!politicalPartyIdentified.success){
      return new VoteResponse(`Political Party Participant with id ${politicalPartyId} is not registered`);
    }

    const date = await new Date();

    console.log(date);
    const newVote = await this.voteRepository.save({
      studentId: studentId,
      politicalPartyId: politicalPartyId,
      registeredDate: date
    });
    return new VoteResponse('',newVote);
    } catch(error){
      return new VoteResponse(`An error ocurred when finding ` + error.message);
    }
  }

  findAll() {
    return `This action returns all vote`;
  }

  findOneVote(id: number)  {

    return new VoteResponse('');
    //return `This action returns a #${id} vote`;
  }

  update(id: number, updateVoteDto: UpdateVoteDto) {
    return `This action updates a #${id} vote`;
  }

  async remove(id: number): Promise<void> {
     await `This action removes a #${id} vote`;
  }
}
