import { Module } from '@nestjs/common';
import { EmailController } from './email.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTHENTICATE_SERVICE',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 4200,
        },
      },
    ]),
  ],
  controllers: [EmailController],
})
export class AuthenticateModule {}