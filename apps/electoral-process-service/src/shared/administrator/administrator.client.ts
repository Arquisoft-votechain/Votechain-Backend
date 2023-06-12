import { Injectable } from "@nestjs/common";
import { Client, ClientProxy, Transport } from "@nestjs/microservices";
import { AdministratorReponse } from "./administrator.response";
import { lastValueFrom, map } from "rxjs";
import { config } from 'dotenv';

config();
@Injectable()
export class AdminClient {

  @Client({
    transport: Transport.TCP,
    options: {
      host: process.env.ADMIN_SERVICE_HOSTNAME,
      port: +process.env.ADMIN_SERVICE_PORT, 
    },
  })
  private readonly clientProxy: ClientProxy;

  async getAdminById(id: number): Promise<AdministratorReponse> {

    const response = await lastValueFrom(this.clientProxy.send({ cmd: 'findOneAdmin' }, id)
      .pipe(
        map(response => response as AdministratorReponse)
      ));

    return response;
  }
}