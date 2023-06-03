import { Module } from '@nestjs/common';
import { EmailController } from './email.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register([
      {
        name: 'AUTHENTICATE_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.HOSTNAME,
          port: +process.env.authenticate_service_port,
        },
      },
    ]),
  ],
  controllers: [EmailController],
})
export class AuthenticateModule {}