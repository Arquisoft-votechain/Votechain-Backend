import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ElectoralProcessController } from './controllers/electoral-process.controller';


@Module({
    imports: [
        ClientsModule.register([
            {
              name: 'ELECTORAL_PROCESS_SERVICE',
              transport: Transport.TCP,
              options: {
                host: process.env.HOSTNAME,
                port: +process.env.electoral_process_service_port,
              },
            },
            {
              name: 'POLITICAL_PARTY_SERVICE',
              transport: Transport.TCP,
              options: {
                host: process.env.HOSTNAME,
                port: +process.env.political_party_service_port,
              },
            },
          ]),
    ],
    controllers: [ElectoralProcessController],
})
export class ElectoralProcessModule { }
