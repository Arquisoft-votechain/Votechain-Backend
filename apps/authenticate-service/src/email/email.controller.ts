import { Body, Controller, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailRequest } from './dto/emaiRequest.dto';
import { ApiTags } from '@nestjs/swagger';
import { MessagePattern } from '@nestjs/microservices';


//@ApiTags('email')
@Controller('email')
export class EmailController {

    constructor(
        private readonly emailService: EmailService
    ){}

    //@Post('send')
    @MessagePattern({ cmd: 'send' })
    @UsePipes(new ValidationPipe({ transform: true }))
    async sendEmail(email:EmailRequest) {
        //console.log(email);

        return await this.emailService.send(email);
    }
}
