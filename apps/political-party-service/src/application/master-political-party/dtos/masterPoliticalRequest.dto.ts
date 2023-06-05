import { IsString, IsArray, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MasterPoliticalRequest {
    @ApiProperty()
    @IsString()
    @MinLength(1)
    @MaxLength(30)
    name:string;

    @ApiProperty()
    @IsString()
    @MinLength(1)    
    description:string;

    @ApiProperty()
    @IsString({each:true})
    @IsArray()
    proposes:string[];
}