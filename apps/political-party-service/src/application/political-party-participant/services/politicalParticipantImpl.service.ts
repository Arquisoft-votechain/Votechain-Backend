import { PoliticalPartyParticipant, PoliticalPartyParticipantService } from "src/domain/index.domain";
import { PoliticalPartyParticipantBasicResponse } from "../dtos/politicalParticipantResponse.dtos";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class PoliticalPartyParticipantServiceImpl implements PoliticalPartyParticipantService{
    
    constructor(
        @InjectRepository(PoliticalPartyParticipant)
        private readonly politicalPartyParticipantRepository: Repository<PoliticalPartyParticipant>,
    ) { }

    async findByMasterIdElectoralProcessIdAndDate(masterId: number, electoralId: number, assignedDate: Date): Promise<PoliticalPartyParticipantBasicResponse[]> {
        
        const ppps = await this.politicalPartyParticipantRepository.find(
            {where:{ 
                master_political_party: {id: masterId},
                electoral_process_id: electoralId,
                assigned_at: this.getSpecificDate(assignedDate),
            }
        })

        return ppps;
    }

    getSpecificDate(date: Date): Date {
        const specificDate = new Date(date);
        specificDate.setHours(0, 0, 0, 0); // Establece las horas, minutos, segundos y milisegundos a cero
        return specificDate;
    }

}