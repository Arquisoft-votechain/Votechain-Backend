import { IsString, IsNotEmpty, IsNumber, MinLength, MaxLength, IsEmpty} from '@nestjs/class-validator';

export class CreateStudentDto {

    @IsString()
    @MinLength(1)
    @MaxLength(10)
    @IsNotEmpty()
    identifier: string;

    @IsString()
    @MinLength(1)
    @MaxLength(15)
    @IsNotEmpty()
    name: string;

    @IsString()
    @MinLength(1)
    @MaxLength(15)
    @IsNotEmpty()
    lastName: string;

    @IsNumber()
    @IsNotEmpty()
    age: number;

    @IsString()
    @MinLength(1)
    @MaxLength(10)
    @IsNotEmpty()
    dni: string;

    @IsNotEmpty()
    userId: number;

    @IsNotEmpty()
    classroomId: number;

    rolId: number;

    politicalPartyId: number;

}
