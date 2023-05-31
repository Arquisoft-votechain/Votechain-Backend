import { IsDate, IsInt, IsPositive, IsString, Max, Min, MinLength } from "@nestjs/class-validator";

export class RequestElectoralProcessDto {

    @IsString()
    @MinLength(1)
    title:string;
    
    @IsDate()
    start_date:Date;
    
    @IsDate()
    end_date:Date;

    @IsInt()
    @IsPositive()
    @Min(1)
    @Max(3)
    status: number;
}
