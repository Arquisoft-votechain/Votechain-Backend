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


    userId: number|null;
    politicalpartyId:number|null;
    classroomId: number|null;
    rolId: number|null;
}
