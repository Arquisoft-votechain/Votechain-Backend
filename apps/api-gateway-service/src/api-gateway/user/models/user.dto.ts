
import { IsString, IsNotEmpty, IsEmail,MinLength, MaxLength} from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RequestUserDto {

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsString()
    @MinLength(6)
    @MaxLength(10)
    @IsNotEmpty()
    password: string;
 
}