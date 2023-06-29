import { Injectable } from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { lastValueFrom, map } from 'rxjs';
import { PoliticalPartyParticipantDto, PoliticalPartyParticipantResponse } from './political-party-participant.dto';
import { config } from 'dotenv';

config()
@Injectable()
export class PoliticalPartyParticipantClient {

  @Client({
    transport: Transport.TCP,
    options: {
      host: process.env.POLITICAL_SERVICE_HOSTNAME,
      port: +process.env.POLITICAL_SERVICE_PORT,
    },
  })
  private readonly clientProxy: ClientProxy;

  async getPoliticalPartyParticipantById(id: number) {
    const response = await lastValueFrom(this.clientProxy.send({ cmd: 'findOnePoliticalPartyParticipant' }, id)
      .pipe(
        map(response => response as PoliticalPartyParticipantResponse)
      ));
    
    return response;
  }
}