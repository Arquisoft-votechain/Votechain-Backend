import { IsString, MinLength } from "class-validator";

export class RequestSchoolDto {

    @IsString()
    @MinLength(1)
    name: string;
}
