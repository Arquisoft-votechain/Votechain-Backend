import { Injectable } from '@nestjs/common';
import { RequestElectoralProcessDto } from './dto/request-electoral-process.dto';
import { ResponseElectoralProcessDto } from './dto/response-electoral-process.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ElectoralProcess } from './entities/electoral-process.entity';
import { Repository } from 'typeorm';
import { PoliticalPartyClient } from './client/school/school.client';
import { ElectoralProcessResponse } from './dto/electoral-process.response';

@Injectable()
export class ElectoralProcessService {
  constructor(
    @InjectRepository(ElectoralProcess)
    private readonly electoralProcessRepository: Repository<ElectoralProcess>,
    private readonly politicalPartyClient: PoliticalPartyClient
  ) { }

  async createBySchoolId(schoolId: number, requestElectoralProcessDto: RequestElectoralProcessDto): Promise<ElectoralProcessResponse> {

    try {
      const schoolResponse = await this.politicalPartyClient.getSchoolById(schoolId);

      if (schoolResponse.success == false) {
        return new ElectoralProcessResponse(schoolResponse.message);
      }

      requestElectoralProcessDto.end_date = new Date(requestElectoralProcessDto.end_date);
      requestElectoralProcessDto.start_date = new Date(requestElectoralProcessDto.start_date);

      const electoralProcessPreload = this.electoralProcessRepository.create(requestElectoralProcessDto);

      electoralProcessPreload.schoolId = schoolResponse.resource.id;

      const electoralProcess = await this.electoralProcessRepository.save(electoralProcessPreload);

      return new ElectoralProcessResponse('', electoralProcess);

    } catch (error) {
      return new ElectoralProcessResponse('An error occurred while creating Electoral Process: ' + error);
    }

  }

  async findAllElectoralProcessesBySchoolId(schoolId: number) {
    return this.electoralProcessRepository.find({ where: { schoolId: schoolId } })
  }

  async findOneBySchoolIdAndId(schoolId: number, id: number): Promise<ElectoralProcessResponse> {
    try {

      const schoolResponse = await this.politicalPartyClient.getSchoolById(schoolId);

      if (schoolResponse.success == false) {
        return new ElectoralProcessResponse(schoolResponse.message);
      }

      const electoralProcess = await this.electoralProcessRepository.findOneBy({ schoolId: schoolId, id: id });
      if (!electoralProcess) return new ElectoralProcessResponse(`An electoral process was not found by schoolId ${schoolId} and Id ${id}]`);

      return new ElectoralProcessResponse('', electoralProcess);

    } catch (error) {
      return new ElectoralProcessResponse('An error occurred while finding Electoral Process: ' + error);
    }
  }

  async updateBySchoolIdAndId(schoolId: number, id: number, requestElectoralProcessDto: ResponseElectoralProcessDto): Promise<ElectoralProcessResponse> {
    try {
      const schoolResponse = await this.politicalPartyClient.getSchoolById(schoolId);

      if (schoolResponse.success == false) {
        return new ElectoralProcessResponse(schoolResponse.message);
      }

      const electoralProcess = await this.electoralProcessRepository.findOneBy({ schoolId: schoolId, id: id });
      if (!electoralProcess) return new ElectoralProcessResponse(`An electoral process was not found by schoolId ${schoolId} and Id ${id}]`);

      const electoralProcessPreload = await this.electoralProcessRepository.preload({
        id: electoralProcess.id,
        schoolId: schoolId,
        ...requestElectoralProcessDto
      })

      const updatedElectoralProcess = await this.electoralProcessRepository.save(electoralProcessPreload);

      return new ElectoralProcessResponse('', updatedElectoralProcess);

    } catch (error) {
      return new ElectoralProcessResponse('An error occurred while updating Electoral Process: ' + error);
    }
  }

  async removeBySchoolIdAndId(schoolId: number, id: number): Promise<ElectoralProcessResponse> {
    try {
      const schoolResponse = await this.politicalPartyClient.getSchoolById(schoolId);

      if (schoolResponse.success == false) {
        return new ElectoralProcessResponse(schoolResponse.message);
      }

      const electoralProcess = await this.electoralProcessRepository.findOneBy({ schoolId: schoolId, id: id });
      if (!electoralProcess) return new ElectoralProcessResponse(`An electoral process was not found by schoolId ${schoolId} and Id ${id}]`);

      const epdeleted = await this.electoralProcessRepository.remove(electoralProcess);

      return new ElectoralProcessResponse('', epdeleted);

    } catch (error) {
      return new ElectoralProcessResponse('An error occurred while removing Electoral Process: ' + error);
    }
  }

}
