import { PoliticalPartyParticipantBasicResponse } from "src/application/index.application";

export interface PoliticalPartyParticipantService {
    findByMasterIdElectoralProcessIdAndDate(masterId: number, electoralId: number, assignedDate: Date)
    : Promise<PoliticalPartyParticipantBasicResponse[]>;
}