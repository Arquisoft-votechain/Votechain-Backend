import { Injectable } from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { lastValueFrom, map } from 'rxjs';
import { SchoolDto } from './school.dto';
import { config } from 'dotenv';

config()
@Injectable()
export class SchoolClient {

  @Client({
    transport: Transport.TCP,
    options: {
      host: process.env.POLITICAL_SERVICE_HOSTNAME,
      port: +process.env.POLITICAL_SERVICE_PORT,
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