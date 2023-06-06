import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { MasterPoliticalParty } from '../../master-political-party/models/masterPolitical.entity';

@Entity()
export class PoliticalPartyParticipant {

    @PrimaryGeneratedColumn('increment')
    id: number;
    
    @Column('int',{name: 'electoral_process_id'})
    electoral_process_id: number;

    @Column('timestamp',{name: 'assigned_at'})
    assigned_at: Date;

    @ManyToOne(
        () => MasterPoliticalParty,
        ( master_political_party ) => master_political_party.political_party_participants,
    )
    @JoinColumn({ name: 'master_political_party_id' })
    master_political_party: MasterPoliticalParty;
}