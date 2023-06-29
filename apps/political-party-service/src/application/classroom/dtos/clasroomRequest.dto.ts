import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsString, MinLength, MaxLength, IsNumber, IsPositive, Max } from 'class-validator';

export class ClassroomRequest {
    @ApiProperty()
    @IsString()
    @MinLength(1)
    @MaxLength(10)
    @Expose()
    name: string;

    @ApiProperty()
    @IsString()
    @MinLength(1)
    @MaxLength(5)
    @Expose()
    section: string;

    @ApiProperty()
    @IsNumber()
    @IsPositive()
    @Max(5)
    @Expose()
    grade:number;
}