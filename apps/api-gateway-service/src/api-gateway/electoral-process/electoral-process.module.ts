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
                host: process.env.ELECTORAL_SERVICE_HOSTNAME,
                port: +process.env.ELECTORAL_SERVICE_PORT,
              },
            },
            {
              name: 'POLITICAL_PARTY_SERVICE',
              transport: Transport.TCP,
              options: {
                host: process.env.POLITICAL_SERVICE_HOSTNAME,
                port: +process.env.POLITICAL_SERVICE_PORT,
              },
            },
          ]),
    ],
    controllers: [ElectoralProcessController],
})
export class ElectoralProcessModule { }
