import { IsString, MinLength } from "class-validator";

export class RequestRoleDto {

    @IsString()
    @MinLength(1)
    name: string;

}
