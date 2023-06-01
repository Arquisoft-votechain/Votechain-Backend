
import { IsNumber, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

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