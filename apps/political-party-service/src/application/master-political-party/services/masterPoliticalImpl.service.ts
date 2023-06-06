import { MasterPoliticalParty, MasterPoliticalPartyService, PoliticalPartyParticipant } from "src/domain/index.domain";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MasterPoliticalBasicResponse, 
    MasterPoliticalResponse, 
    PoliticalPartyPanticipantRequest, 
    PoliticalPartyPariticipantResponse } from "src/application/index.application";

@Injectable()
export class MasterPoliticalPartyServiceImpl implements MasterPoliticalPartyService {

    constructor(
        @InjectRepository(MasterPoliticalParty)
        private readonly masterPoliticalPartyRepository: Repository<MasterPoliticalParty>,
        @InjectRepository(PoliticalPartyParticipant)
        private readonly politicalPartyParticipantRepository: Repository<PoliticalPartyParticipant>,
    ) { }
    
    
    async createPoliticalPartyParticipantByMasterIdAndEpId(masterId: number, epid: number, politicalParticipantRequest: PoliticalPartyPanticipantRequest)
    : Promise<PoliticalPartyPariticipantResponse> {
        try{
            const masterPP = await this.masterPoliticalPartyRepository.findOneBy({ id: masterId });
            if (!masterPP) return new PoliticalPartyPariticipantResponse(`Master-political-party with id ${masterId} not found`)

            //Falta buscar que existe el electoral process

            const politicalParticipantPreload = this.politicalPartyParticipantRepository.create(politicalParticipantRequest);
            politicalParticipantPreload.electoral_process_id = epid;
            politicalParticipantPreload.master_political_party = masterPP;

            const politicalPartyParticipant = await this.politicalPartyParticipantRepository.save(politicalParticipantPreload);

            return new PoliticalPartyPariticipantResponse('',politicalPartyParticipant);

        }catch(error){
            return new PoliticalPartyPariticipantResponse('An error occurred while saving political-party-participant: '+error.message);
        }
    }



    async getAllMasterPoliticalParties(): Promise<MasterPoliticalBasicResponse[]> {
        const masterPPs = await this.masterPoliticalPartyRepository.find({});
        return masterPPs;
    }

    async getMasterPoliticalPartyById(id: number): Promise<MasterPoliticalResponse> {
        try {
            const masterPP = await this.masterPoliticalPartyRepository.findOneBy({ id });
            if (!masterPP) return new MasterPoliticalResponse(`Master-political-party with id ${id} not found`)
            
            return new MasterPoliticalResponse('',masterPP);
        } catch (error) {
            return new MasterPoliticalResponse('An error occurred while finding master-political-party: '+error.message);
        }
    }

    async deletePoliticalPartyParticipantByMasterIdAndAndId(masterId: number, id: number): Promise<MasterPoliticalResponse> {
        try {
            const masterPP = await this.masterPoliticalPartyRepository.findOneBy({ id });
            if (!masterPP) return new MasterPoliticalResponse(`Master-political-party with id ${id} not found`)

            const masterPPdeleted = await this.masterPoliticalPartyRepository.remove(masterPP);

            return new MasterPoliticalResponse('', masterPPdeleted);

        } catch (error) {
            return new MasterPoliticalResponse('An error occurred while delenting master-political-participant: '+error.message);
        }
    }

}