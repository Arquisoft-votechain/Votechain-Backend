import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { EmailRequest } from './models/email.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('emails')
@Controller('emails')
export class EmailController {
  constructor(@Inject('AUTHENTICATE_SERVICE') private client:ClientProxy) {}

  @Post('send')
  sendEmail(@Body() email: EmailRequest) {
    return this.client.send({ cmd: 'send' }, email);
  }
}