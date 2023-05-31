import { Injectable } from '@nestjs/common';
import { RequestElectoralProcessDto } from './dto/request-electoral-process.dto';
import { ResponseElectoralProcessDto } from './dto/response-electoral-process.dto';

@Injectable()
export class ElectoralProcessService {
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
