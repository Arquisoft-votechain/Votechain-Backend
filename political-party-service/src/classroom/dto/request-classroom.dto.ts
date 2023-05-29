import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive, IsString, Max, MaxLength, MinLength } from 'class-validator';

export class RequestClassroomDto {
    
    @ApiProperty()
    @IsString()
    @MinLength(1)
    @MaxLength(10)
    name: string;

    @ApiProperty()
    @IsString()
    @MinLength(1)
    @MaxLength(5)
    section: string;

    @ApiProperty()
    @IsNumber()
    @IsPositive()
    @Max(5)
    grade:number;
}
