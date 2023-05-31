import { School } from "src/school/entities/school.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { MinLength } from 'class-validator';
import { PoliticalPartyParticipant } from "src/political-party-participant/entities/political-party-participant.entity";

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
    school:School;

    @OneToMany(
        () => PoliticalPartyParticipant,
        (political_party_participant) => political_party_participant.master_political_party,
        { cascade: true }
    )
    political_party_participants:PoliticalPartyParticipant[]

}
