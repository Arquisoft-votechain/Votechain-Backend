import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsDateString } from "class-validator";

export class PoliticalPartyPanticipantRequest{

    @ApiProperty()
    @IsDateString()
    assigned_at: Date;
}