import { IsNumber, IsString, isString } from 'class-validator';

export class EmailRequest{

    @IsString()
    readonly emailRecipient: string;

    @IsString()
    readonly subject: string;

    @IsNumber()
    readonly code: number;

    @IsString()
    readonly nameRecipient: string;
}