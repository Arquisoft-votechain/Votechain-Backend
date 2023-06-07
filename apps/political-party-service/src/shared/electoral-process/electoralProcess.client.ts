import { Injectable } from "@nestjs/common";
import { Client, ClientProxy, Transport } from "@nestjs/microservices";

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

  
}