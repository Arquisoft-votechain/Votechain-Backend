import { Injectable } from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { lastValueFrom, map } from 'rxjs';
import { RolDto } from './rol.dto';

@Injectable()
export class RolClient {

  @Client({
    transport: Transport.TCP,
    options: {
      host: '127.0.0.1',
      port: 4201,
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