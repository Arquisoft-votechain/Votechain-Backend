import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNumber, IsString, MaxLength, MinLength } from "class-validator";

export class RequestMasterPoliticalPartyDto {

    @ApiProperty()
    @IsString()
    @MinLength(1)
    @MaxLength(30)
    name:string;

    @ApiProperty()
    @IsString()
    @MinLength(1)    
    description:string;

    @ApiProperty()
    @IsString({each:true})
    @IsArray()
    proposes:string[];
}
