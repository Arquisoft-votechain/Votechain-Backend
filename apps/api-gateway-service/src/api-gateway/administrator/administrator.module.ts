import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AdministratorController } from './controllers/administrator.controller';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register([
      {
        name: 'ADMINISTRATOR_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.ADMIN_SERVICE_HOSTNAME,
          port: +process.env.ADMIN_SERVICE_PORT,
        },
      },
    ]),
  ],
  controllers: [
    AdministratorController
  ]
})
export class AdministratorModule { }
