import { PartialType } from "@nestjs/swagger"
import { BaseResponse } from "src/utils/base.response";
import { PoliticalPartyPanticipantRequest } from "./politicalParticipantRequest.dto";

export class PoliticalPartyParticipantBasicResponse extends PartialType(PoliticalPartyPanticipantRequest){}

export class PoliticalPartyPariticipantResponse extends BaseResponse<PoliticalPartyParticipantBasicResponse>{}