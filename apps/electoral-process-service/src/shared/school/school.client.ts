import { Injectable } from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { SchoolBasicResponse, SchoolReponse } from './school.reponse';
import { lastValueFrom, map } from 'rxjs';

@Injectable()
export class PoliticalPartyClient {

  @Client({
    transport: Transport.TCP,
    options: {
      host: process.env.political_party_hostname,
      port: 4201, //Por alguna razon no carga el port desde .env
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
}
