import { Body, Controller, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailRequest } from './dto/emaiRequest.dto';


@Controller('api/email')
export class EmailController {

    constructor(
        private readonly emailService: EmailService
    ){}

    @Post('send')
    @UsePipes(new ValidationPipe())
    async sendEmail(@Body() email:EmailRequest) {
        //console.log(email);

        return await this.emailService.send(email);
    }
}
