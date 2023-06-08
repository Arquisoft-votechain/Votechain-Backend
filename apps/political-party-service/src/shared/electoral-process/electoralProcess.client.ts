import { Injectable } from "@nestjs/common";
import { Client, ClientProxy, Transport } from "@nestjs/microservices";
import { ElectoralProcessReponse } from "./electoralProcess.response";
import { lastValueFrom, map } from "rxjs";

@Injectable()
export class ElectoralProcessClient {


  @Client({
    transport: Transport.TCP,
    options: {
      host: process.env.electoral_process_hostname,
      port: 4202, //Por alguna razon no carga el port desde .env
    },
  })
  private readonly clientProxy: ClientProxy;

  async getElectoralProcessById(id: number): Promise<ElectoralProcessReponse>{
    const response = await lastValueFrom(this.clientProxy.send({ cmd: 'findOneElectoralProcessById' }, id)
      .pipe(
        map(response => response as ElectoralProcessReponse)
      ));

    return response;
  }
}