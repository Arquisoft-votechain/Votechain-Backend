import { Injectable } from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { lastValueFrom, map } from 'rxjs';
import { RolDto } from './rol.dto';
import { config } from 'dotenv';

config()
@Injectable()
export class RolClient {

  @Client({
    transport: Transport.TCP,
    options: {
      host: process.env.POLITICAL_SERVICE_HOSTNAME,
      port: +process.env.POLITICAL_SERVICE_PORT,
    },
  })
  private readonly clientProxy: ClientProxy;

  async getRolById(id: number) {
    const response = await lastValueFrom(this.clientProxy.send({ cmd: 'findOne' }, id)
      .pipe(
        map(response => response as RolDto)
      ));
    
    return response;
  }
}