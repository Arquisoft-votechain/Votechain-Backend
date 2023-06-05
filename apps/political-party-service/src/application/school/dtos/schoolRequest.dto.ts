import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength } from "class-validator";

export class SchoolRequest {

    @ApiProperty()
    @IsString()
    @MinLength(1)
    name: string;
}
