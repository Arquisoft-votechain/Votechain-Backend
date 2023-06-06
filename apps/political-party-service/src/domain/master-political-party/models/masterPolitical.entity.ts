
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PoliticalPartyParticipant } from '../../political-party-participant/models/politicalParticipant.entity';
import { School } from "src/domain/index.domain";

@Entity()
export class MasterPoliticalParty {

    @PrimaryGeneratedColumn('increment')
    id:number;

    @Column('varchar',{
        length: 30
    })
    name:string;

    @Column('text')
    description:string;

    @Column('text',{
        array: true
    })
    proposes:string[];

    @ManyToOne(
        () => School,
        ( school ) => school.master_political_parties,
    )
    @JoinColumn({ name: 'school_id' })
    school:School;

    @OneToMany(
        () => PoliticalPartyParticipant,
        (political_party_participant) => political_party_participant.master_political_party,
        { cascade: true }
    )
    political_party_participants: PoliticalPartyParticipant[]

}
