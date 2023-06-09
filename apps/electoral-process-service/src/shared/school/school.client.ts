import { Injectable } from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { SchoolBasicResponse, SchoolReponse } from './school.reponse';
import { lastValueFrom, map } from 'rxjs';
import { PoliticalPartyPanticipantDto } from '../political-party-participant/politicalPartyParticipant.dto';
import { config } from 'dotenv';

config()
@Injectable()
export class PoliticalPartyClient {

  @Client({
    transport: Transport.TCP,
    options: {
      host: process.env.POLITICAL_SERVICE_HOSTNAME,
      port: +process.env.POLITICAL_SERVICE_PORT, //Por alguna razon no carga el port desde .env
    },
  })
  private readonly clientProxy: ClientProxy;

  async getSchoolById(id: number): Promise<SchoolReponse> {

    const response = await lastValueFrom(this.clientProxy.send({ cmd: 'findOneSchool' }, id)
      .pipe(
        map(response => response as SchoolReponse)
      ));

    return response;
  }

  async getPoliticalPartyParticipantsByElectoralId(electoralId: number) {

    const response = await lastValueFrom(this.clientProxy.send<[]>({cmd: 'getPoliticalPartyParticipantsByElectoralId' },electoralId)
    .pipe(
      map(resp => resp.map(item => item as PoliticalPartyPanticipantDto))
    )
    );

    return response;
  }

}
