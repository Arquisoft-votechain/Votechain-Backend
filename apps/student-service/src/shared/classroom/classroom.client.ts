import { Injectable } from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { lastValueFrom, map } from 'rxjs';
import { ClassroomDto, ClassroomResponse } from './classroom.dto';

@Injectable()
export class ClassroomClient {

  @Client({
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: 4201,
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