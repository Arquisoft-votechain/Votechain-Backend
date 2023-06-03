import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ElectoralProcessService } from './electoral-process.service';
import { RequestElectoralProcessDto } from './dto/request-electoral-process.dto';
import { ResponseElectoralProcessDto } from './dto/response-electoral-process.dto';
import { MessagePattern } from '@nestjs/microservices';
import { ElectoralProcessResponse } from './dto/electoral-process.response';

@Controller('electoral-process')
export class ElectoralProcessController {
  constructor(private readonly electoralProcessService: ElectoralProcessService) { }

  @MessagePattern({ cmd: 'createElectoralProcessBySchoolId' })
  async createBySchoolId(data: { schoolId: number, requestElectoralProcessDto: RequestElectoralProcessDto }) {
    const { schoolId, requestElectoralProcessDto } = data;
    return await this.electoralProcessService.createBySchoolId(schoolId, requestElectoralProcessDto);
  }

  @MessagePattern({ cmd: 'findAllElectoralProcessesBySchoolId' })
  async findAllElectoralProcessesBySchoolId(schoolId: number) {
    return await this.electoralProcessService.findAllElectoralProcessesBySchoolId(schoolId);
  }

  @MessagePattern({ cmd: 'findOneElectoralProcessBySchoolIdAndId' })
  async findOneBySchoolIdAndId(data: { schoolId: number, id: number }): Promise<ElectoralProcessResponse> {
    const { schoolId, id } = data;
    return await this.electoralProcessService.findOneBySchoolIdAndId(schoolId, id);
  }

  @MessagePattern({ cmd: 'updateElectoralProcessBySchoolIdAndId' })
  async updateBySchoolIdAndId(data: { schoolId: number, id: number, requestElectoralProcessDto: ResponseElectoralProcessDto }): Promise<ElectoralProcessResponse> {
    const { schoolId, id, requestElectoralProcessDto } = data;
    return await this.electoralProcessService.updateBySchoolIdAndId(schoolId, id, requestElectoralProcessDto);
  }

  @MessagePattern({ cmd: 'removeElectoralProcessBySchoolIdAndId' })
  async removeBySchoolIdAndId(data: { schoolId: number, id: number }): Promise<ElectoralProcessResponse> {
    const { schoolId, id } = data;
    return await this.electoralProcessService.removeBySchoolIdAndId(schoolId, id);
  }

}
