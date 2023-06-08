import { BaseResponse } from "src/utils/base.response";

export class PoliticalPartyParticipantDto{
    id: number;
    electoral_process_id: number;
    master_political_party_id: number;
}

export class PoliticalPartyParticipantResponse extends BaseResponse<PoliticalPartyParticipantDto>{
    
}