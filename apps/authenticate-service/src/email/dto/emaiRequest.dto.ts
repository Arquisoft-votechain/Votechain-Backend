import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, isString } from 'class-validator';

export class EmailRequest{

    @ApiProperty()
    @IsString()
    readonly emailRecipient: string;

    @ApiProperty()
    @IsString()
    readonly subject: string;

    @ApiProperty()
    @IsNumber()
    readonly code: number;

    @ApiProperty()
    @IsString()
    readonly nameRecipient: string;
}