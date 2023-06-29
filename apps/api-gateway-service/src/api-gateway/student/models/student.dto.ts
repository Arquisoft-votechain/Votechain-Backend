import { IsString, IsNotEmpty, IsNumber, MinLength, MaxLength} from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmpty } from 'class-validator';

export class RequestStudentDto {

    @ApiProperty()
    @IsString()
    @MinLength(1)
    @MaxLength(10)
    @IsNotEmpty()
    identifier: string;

    @ApiProperty()
    @IsString()
    @MinLength(1)
    @MaxLength(15)
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsString()
    @MinLength(1)
    @MaxLength(15)
    @IsNotEmpty()
    lastName: string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    age: number;

    @ApiProperty()
    @IsString()
    @MinLength(1)
    @MaxLength(10)
    @IsNotEmpty()
    dni: string;

    @ApiProperty()
    @IsNotEmpty()
    userId: number;

    @ApiProperty()
    @IsNotEmpty()
    classroomId: number;

    @ApiProperty()
    rolId: number;

    @ApiProperty()
    politicalPartyId: number;
}
