import { Injectable } from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { lastValueFrom, map } from 'rxjs';
import { UserDto } from './user.dto';
import { config } from 'dotenv';

config()
@Injectable()
export class UserClient {

  @Client({
    transport: Transport.TCP,
    options: {
      host: process.env.USER_SERVICE_HOSTNAME,
      port: +process.env.USER_SERVICE_PORT,
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