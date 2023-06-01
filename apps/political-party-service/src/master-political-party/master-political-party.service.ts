import { Injectable, NotFoundException } from '@nestjs/common';
import { RequestMasterPoliticalPartyDto } from './dto/request-master-political-party.dto';
import { ResponseMasterPoliticalPartyDto } from './dto/response-master-political-party.dto';
import { MasterPoliticalParty } from './entities/master-political-party.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PoliticalPartyParticipant } from 'src/political-party-participant/entities/political-party-participant.entity';
import { RequestPoliticalPartyParticipantDto } from '../political-party-participant/dto/request-political-party-participant.dto';

@Injectable()
export class MasterPoliticalPartyService {

  constructor(
    @InjectRepository(MasterPoliticalParty)
    private readonly masterPoliticalPartyRepository: Repository<MasterPoliticalParty>,
    @InjectRepository(PoliticalPartyParticipant)
    private readonly politicalPartyParticipantRepository: Repository<PoliticalPartyParticipant>,
  ) { }


  findAll() {
    return this.masterPoliticalPartyRepository.find({});
  }

  async findOne(id: number) {
    const masterPP = await this.masterPoliticalPartyRepository.findOneBy({ id });
    if (!masterPP) throw new NotFoundException(`Master-political-party with id ${id} not found`)
    return masterPP;
  }

  async createPoliticalPartyParticipantByMasterIdAndEpId(id: number, electoral_process_id: number, politicalPartyParticipant: RequestPoliticalPartyParticipantDto) {

    const masterPP = await this.masterPoliticalPartyRepository.findOneBy({ id });
    if (!masterPP) throw new NotFoundException(`Master-political-party with id ${id} not found`)

    //Buscamos existencia del electoral process

    const ppp = this.politicalPartyParticipantRepository.create(politicalPartyParticipant);
    ppp.master_political_party = masterPP;

    return await this.politicalPartyParticipantRepository.save(ppp);
  }

  async deletePoliticalPartyParticipantByMasterIdAndAndId(masterId: number, id: number) {

    const masterPP = await this.masterPoliticalPartyRepository.findOneBy({ id });
    if (!masterPP) throw new NotFoundException(`Master-political-party with id ${id} not found`);

    //Buscamos el proceso


    const ppp = await this.politicalPartyParticipantRepository.findOneBy({
      id: id,
      master_political_party: {
        id: masterId
      }
    })

    if (!ppp) throw new NotFoundException(`Political Party Participant with id ${id} not found`);

    await this.politicalPartyParticipantRepository.remove(ppp);
  }

  /*async deletePoliticalPartyParticipantByMasterIdAndElectoralIdAndId(masterId: number, electoralId: number,id: number) {

    const masterPP =  await this.masterPoliticalPartyRepository.findOneBy({id});
    if(!masterPP) throw new NotFoundException(`Master-political-party with id ${id} not found`);

    //Buscamos el proceso


    const ppp = await this.politicalPartyParticipantRepository.findOneBy({
      id: id,
      school:{
        id:schoolId
      }
    })

    if(!classroom) throw new NotFoundException(`Classroom with id ${id} not found`);

    await this.classroomRepository.remove(classroom);
  }*/


}
