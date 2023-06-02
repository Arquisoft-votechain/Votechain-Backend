import { Injectable } from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { lastValueFrom, map } from 'rxjs';
import { PoliticalPartyParticipantDto } from './political-party-participant.dto';

@Injectable()
export class PoliticalPartyParticipantClient {

  @Client({
    transport: Transport.TCP,
    options: {
      host: '127.0.0.1',
      port: 4201,
    },
  })
  private readonly clientProxy: ClientProxy;

  async getPoliticalPartyParticipantById(id: number) {
    const response = await lastValueFrom(this.clientProxy.send({ cmd: 'findOne' }, id)
      .pipe(
        map(response => response as PoliticalPartyParticipantDto)
      ));
    
    return response;
  }
}