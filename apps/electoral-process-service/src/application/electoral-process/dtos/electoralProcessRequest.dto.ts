import { IsDateString, IsInt, IsPositive, IsString, Max, Min, MinLength } from "@nestjs/class-validator";

export class ElectoralProcessRequest{
    
    @IsString()
    @MinLength(1)
    title:string;
    
    @IsDateString()
    start_date:Date;
    
    @IsDateString()
    end_date:Date;

    @IsInt()
    @IsPositive()
    @Min(1)
    @Max(3)
    status: number;
}