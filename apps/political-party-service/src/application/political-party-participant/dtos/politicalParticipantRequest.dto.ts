import { IsDate } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class PoliticalPartyPanticipantRequest{

    @ApiProperty()
    @IsDate()
    assigned_at: Date;
}