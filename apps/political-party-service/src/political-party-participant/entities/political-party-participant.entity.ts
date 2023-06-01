import { MasterPoliticalParty } from "src/master-political-party/entities/master-political-party.entity";
import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PoliticalPartyParticipant {

    @PrimaryGeneratedColumn('increment')
    id: number;

    
    electoral_process_id: number;

    @ManyToOne(
        () => MasterPoliticalParty,
        ( master_political_party ) => master_political_party.political_party_participants,
    )
    master_political_party: MasterPoliticalParty;
}
