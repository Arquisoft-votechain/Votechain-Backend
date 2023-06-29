import { Injectable } from '@nestjs/common';
import { CreateVoteDto } from '../dto/create-vote.dto';
import { UpdateVoteDto } from '../dto/update-vote.dto';
import { Student, Vote, VoteService } from 'src/domain/index.domain';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { VoteResponse } from '../dto/vote.response';
import { PoliticalPartyParticipantClient } from 'src/shared/political-party-participant/political-party-participant.client';

@Injectable()
export class VoteServiceImpl implements VoteService {

  constructor(@InjectRepository(Vote) private voteRepository: Repository<Vote>,
    @InjectRepository(Student) private studentRepository: Repository<Student>,
    private readonly politicalPartyClient: PoliticalPartyParticipantClient) { }

  async registerVote(studentId: number, politicalPartyId: number) {
    try {
      const studentIdentified = await this.studentRepository.findOne({ where: { id: studentId } });
      if (!studentIdentified) {
        return new VoteResponse(`Student with id ${studentId} was not found`);
      }
      const politicalPartyIdentified = await this.politicalPartyClient.getPoliticalPartyParticipantById(politicalPartyId);
      if (!politicalPartyIdentified.success) {
        return new VoteResponse(`Political Party Participant with id ${politicalPartyId} was not found`);
      }

      const existedVote = await this.voteRepository.findOneBy({studentId: studentId, electoralProcessId: politicalPartyIdentified.resource.electoral_process_id});
      if(existedVote) return new VoteResponse('A student can vote only once per electoral process');

      const date = new Date();

      console.log(date);
      const newVote = await this.voteRepository.save({
        studentId: studentId,
        politicalPartyId: politicalPartyId,
        registeredDate: date,
        electoralProcessId: politicalPartyIdentified.resource.electoral_process_id
      });
      return new VoteResponse('', newVote);
    } catch (error) {
      return new VoteResponse(`An error ocurred when finding ` + error.message);
    }
  }

  findAll() {
    return `This action returns all vote`;
  }

  async findCountVotesByPoliticalPartyId(pppId: number) {
    try {
      const politicalPartyIdentified = await this.politicalPartyClient.getPoliticalPartyParticipantById(pppId);
      if (!politicalPartyIdentified.success) {
        return new VoteResponse(`Political Party Participant with id ${pppId} is not registered`);
      }
      const listVotes = await this.voteRepository.findAndCount({ where: { politicalPartyId: pppId } });
      return  {
        votes: listVotes[1]
      };
    } catch (error) {
      return new VoteResponse(`An error ocurred when finding ` + error.message);
    }
  }

  findOneVote(id: number) {

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
