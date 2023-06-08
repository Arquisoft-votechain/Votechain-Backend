import { IsString, IsNotEmpty, IsEmail,MinLength, MaxLength} from '@nestjs/class-validator';
export class CreateUserDto {

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @MinLength(6)
    @MaxLength(10)
    @IsNotEmpty()
    password: string;

 
}
