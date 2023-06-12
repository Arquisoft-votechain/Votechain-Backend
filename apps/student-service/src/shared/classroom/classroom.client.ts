import { Injectable } from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { lastValueFrom, map } from 'rxjs';
import { ClassroomDto, ClassroomResponse } from './classroom.dto';
import { config } from 'dotenv';

config()
@Injectable()
export class ClassroomClient {

  @Client({
    transport: Transport.TCP,
    options: {
      host: process.env.POLITICAL_SERVICE_HOSTNAME,
      port: +process.env.POLITICAL_SERVICE_PORT,
    },
  })
  private readonly clientProxy: ClientProxy;

  async getClassroomById(id: number) {
    const response = await lastValueFrom(this.clientProxy.send({ cmd: 'findOneClassroom' }, id)
      .pipe(
        map(response => response as ClassroomResponse)
      ));
    
    return response;
  }
}