import { Injectable } from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { SchoolDto } from './school.dto';
import { lastValueFrom, map } from 'rxjs';

@Injectable()
export class PoliticalPartyClient {

  @Client({
    transport: Transport.TCP,
    options: {
      host: '127.0.0.1',
      port: 4201,
    },
  })
  private readonly clientProxy: ClientProxy;

  async getSchoolById(id: number) {
    const response = await lastValueFrom(this.clientProxy.send({ cmd: 'findOneSchool' }, id)
      .pipe(
        map(response => response as SchoolDto)
      ));
    
    return response;
  }
}
