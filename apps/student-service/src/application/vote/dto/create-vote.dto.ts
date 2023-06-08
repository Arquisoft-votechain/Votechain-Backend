import { IsDateString, IsString, MinLength } from "@nestjs/class-validator";

export class CreateVoteDto {

    @IsDateString()
    registeredDate:Date;

}
