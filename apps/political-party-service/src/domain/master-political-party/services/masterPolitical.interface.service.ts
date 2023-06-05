import { MasterPoliticalBasicResponse, 
    MasterPoliticalRequest, 
    MasterPoliticalResponse, 
    PoliticalPartyPanticipantRequest, 
    PoliticalPartyPariticipantResponse } from 'src/application/index.application';

export interface MasterPoliticalPartyService {
    getAllMasterPoliticalParties():Promise<MasterPoliticalBasicResponse[]>;
    getMasterPoliticalPartyById(id: number): Promise<MasterPoliticalResponse>;
    createPoliticalPartyParticipantByMasterIdAndEpId(masterId: number, epid: number, politicalParticipantRequest: PoliticalPartyPanticipantRequest): Promise<PoliticalPartyPariticipantResponse>;
    deletePoliticalPartyParticipantByMasterIdAndAndId(masterId: number, id: number): Promise<MasterPoliticalResponse>;

}