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
          host: process.env.AUTH_SERVICE_HOSTNAME,
          port: +process.env.AUTH_SERVICE_PORT,
        },
      },
    ]),
  ],
  controllers: [EmailController],
})
export class AuthenticateModule {}