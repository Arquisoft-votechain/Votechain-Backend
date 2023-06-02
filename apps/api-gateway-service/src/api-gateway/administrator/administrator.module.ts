import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AdministratorController } from './controllers/administrator.controller';


@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ADMINISTRATOR_SERVICE',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 4204,
        },
      },
    ]),
  ],
  controllers: [
    AdministratorController
  ]
})
export class AdministratorModule { }
