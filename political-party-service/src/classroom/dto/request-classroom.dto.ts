import { IsNumber, IsPositive, IsString, Max, MaxLength, MinLength } from 'class-validator';

export class RequestClassroomDto {
    @IsString()
    @MinLength(1)
    @MaxLength(10)
    name: string;

    @IsString()
    @MinLength(1)
    @MaxLength(5)
    section: string;

    @IsNumber()
    @IsPositive()
    @Max(5)
    grade:number;
}
