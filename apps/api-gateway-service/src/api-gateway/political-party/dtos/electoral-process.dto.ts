import { IsDate, IsInt, IsPositive, IsString, Max, Min, MinLength } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { IsDateString } from "class-validator";

export class RequestElectoralProcessDto {

    @ApiProperty()
    @IsString()
    @MinLength(1)
    title:string;
    
    @ApiProperty()
    @IsDateString()
    start_date:Date;
    
    @ApiProperty()
    @IsDateString()
    end_date:Date;

    @ApiProperty()
    @IsInt()
    @IsPositive()
    @Min(1)
    @Max(3)
    status: number;
}
