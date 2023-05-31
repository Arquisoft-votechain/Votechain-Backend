import { Injectable } from '@nestjs/common';
import { RequestPoliticalPartyParticipantDto } from './dto/request-political-party-participant.dto';
import { ResponsePoliticalPartyParticipantDto } from './dto/response-political-party-participant.dto';

@Injectable()
export class PoliticalPartyParticipantService {
  create(createPoliticalPartyParticipantDto: RequestPoliticalPartyParticipantDto) {
    return 'This action adds a new politicalPartyParticipant';
  }

  findAll() {
    return `This action returns all politicalPartyParticipant`;
  }

  findOne(id: number) {
    return `This action returns a #${id} politicalPartyParticipant`;
  }

  update(id: number, updatePoliticalPartyParticipantDto: ResponsePoliticalPartyParticipantDto) {
    return `This action updates a #${id} politicalPartyParticipant`;
  }

  remove(id: number) {
    return `This action removes a #${id} politicalPartyParticipant`;
  }
}
