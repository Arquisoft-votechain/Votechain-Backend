import { Injectable } from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { lastValueFrom, map } from 'rxjs';

import { config } from 'dotenv';
import { ElectoralProcessResponse } from './electoralProcess.dto';

config()
@Injectable()
export class ElectoralProcessClient {

  @Client({
    transport: Transport.TCP,
    options: {
      host: process.env.ELECTORAL_SERVICE_HOSTNAME,
      port: +process.env.ELECTORAL_SERVICE_PORT,
    },
  })
  private readonly clientProxy: ClientProxy;

  async getElectoralProcessById(id: number) {
    const response = await lastValueFrom(this.clientProxy.send({ cmd: 'findOneElectoralProcessById' }, id)
      .pipe(
        map(response => response as ElectoralProcessResponse)
      ));
    
    return response;
  }
}