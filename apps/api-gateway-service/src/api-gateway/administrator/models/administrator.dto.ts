import { IsString, IsNotEmpty, IsNumber, MinLength, MaxLength} from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RequestAdministratorDto {

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
}
