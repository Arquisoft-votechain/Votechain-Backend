import { Injectable } from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { lastValueFrom, map } from 'rxjs';
import { UserDto } from './user.dto';

@Injectable()
export class UserClient {

  @Client({
    transport: Transport.TCP,
    options: {
      host: '127.0.0.1',
      port: 4203,
    },
  })
  private readonly clientProxy: ClientProxy;

  async getUserById(id: number) {
    const response = await lastValueFrom(this.clientProxy.send({ cmd: 'findOneUser' }, id)
      .pipe(
        map(response => response as UserDto)
      ));
    
    return response;
  }
}