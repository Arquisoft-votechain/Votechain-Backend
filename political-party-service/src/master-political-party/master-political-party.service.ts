import { Injectable, NotFoundException } from '@nestjs/common';
import { RequestMasterPoliticalPartyDto } from './dto/request-master-political-party.dto';
import { ResponseMasterPoliticalPartyDto } from './dto/response-master-political-party.dto';
import { MasterPoliticalParty } from './entities/master-political-party.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MasterPoliticalPartyService {
  constructor(
    @InjectRepository(MasterPoliticalParty)
    private readonly masterPoliticalPartyRepository: Repository<MasterPoliticalParty>,
  ){}


  findAll() {
    return this.masterPoliticalPartyRepository.find({});
  }

  async findOne(id: number) {
    const masterPP =  await this.masterPoliticalPartyRepository.findOneBy({id});
    if(!masterPP) throw new NotFoundException(`Master-political-party with id ${id} not found`)
    return masterPP;
  }


}
