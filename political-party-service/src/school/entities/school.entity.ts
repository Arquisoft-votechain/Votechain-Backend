import { Classroom } from "src/classroom/entities/classroom.entity";
import { MasterPoliticalParty } from "src/master-political-party/entities/master-political-party.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class School {
    @PrimaryGeneratedColumn('increment')
    id:number;

    @Column('varchar',{
        length: 25,
        unique: true
    })
    name:string;

    @OneToMany(
        () => Classroom,
        (classroom) => classroom.school,
        { cascade: true }
    )
    classrooms:Classroom[]

    @OneToMany(
        () => MasterPoliticalParty,
        (master_political_party) => master_political_party.school,
        { cascade: true }
    )
    master_political_parties:MasterPoliticalParty[]
}
