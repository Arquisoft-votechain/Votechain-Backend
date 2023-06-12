import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as SendGrid from '@sendgrid/mail';
import { EmailRequest } from './dto/emaiRequest.dto';
import { emailWithOTP } from 'src/assets/emailTemplates/emailString';


@Injectable()
export class EmailService {

    private readonly fromEmail: string;
    private readonly fromName: string;
    private htmlContent: string;

    constructor(private readonly configService: ConfigService) {
        // Don't forget this one.
        // The apiKey is required to authenticate our
        // request to SendGrid API.
        SendGrid.setApiKey(this.configService.get<string>('APIKey'));
        this.fromEmail = this.configService.get<string>('FromEmail');
        this.fromName = this.configService.get<string>('FromName');

        //this.htmlContent = fs.readFileSync('src/assets/emailTemplates/emailWithOtp.html', 'utf-8');
        this.htmlContent = emailWithOTP;
    }

    async send(mailRequest: EmailRequest) {

        this.htmlContent = this.htmlContent.replace("{{name}}",mailRequest.nameRecipient)
        .replace("{{code}}",mailRequest.code.toString());

        const mail: SendGrid.MailDataRequired = {
            to: mailRequest.emailRecipient,
            subject: mailRequest.subject,
            from: this.fromEmail,
            html: this.htmlContent
        }


        const transport = await SendGrid.send(mail);

        //console.log(`Email successfully dispatched to ${mail.to}`)
        return transport;
    }


}
