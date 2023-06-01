import { Injectable } from '@nestjs/common';
import { RequestElectoralProcessDto } from './dto/request-electoral-process.dto';
import { ResponseElectoralProcessDto } from './dto/response-electoral-process.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ElectoralProcess } from './entities/electoral-process.entity';
import { Repository } from 'typeorm';
import { PoliticalPartyClient } from './client/school/school.client';

@Injectable()
export class ElectoralProcessService {
  constructor(
    @InjectRepository(ElectoralProcess)
    private readonly electoralProcessRepository: Repository<ElectoralProcess>,
    private readonly politicalPartyClient: PoliticalPartyClient
  ) { }

  async createBySchoolId(schoolId: number, requestElectoralProcessDto: RequestElectoralProcessDto) {
    const school = await this.politicalPartyClient.getSchoolById(schoolId);
    
    console.log(school);

    requestElectoralProcessDto.end_date = new Date(requestElectoralProcessDto.end_date);
    requestElectoralProcessDto.start_date = new Date(requestElectoralProcessDto.start_date);
    console.log(requestElectoralProcessDto);
    
    const electoralProcess = this.electoralProcessRepository.create(requestElectoralProcessDto);
    
    electoralProcess.schoolId = school.id;
    
    return await this.electoralProcessRepository.save(electoralProcess);
  }

  create(createElectoralProcessDto: RequestElectoralProcessDto) {
    return 'This action adds a new electoralProcess';
  }

  findAll() {
    return `This action returns all electoralProcess`;
  }

  findOne(id: number) {
    return `This action returns a #${id} electoralProcess`;
  }

  update(id: number, updateElectoralProcessDto: ResponseElectoralProcessDto) {
    return `This action updates a #${id} electoralProcess`;
  }

  remove(id: number) {
    return `This action removes a #${id} electoralProcess`;
  }
}
