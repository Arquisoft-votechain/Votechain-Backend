import { Classroom } from "../../classroom/models/classroom.entity";
import { MasterPoliticalParty } from "../../master-political-party/models/masterPolitical.entity"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class School {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('varchar', {
        length: 25,
        unique: true
    })
    name: string;

    @OneToMany(
        () => Classroom,
        (classroom) => classroom.school,
        { cascade: true }
    )
    classrooms: Classroom[]

    @OneToMany(
        () => MasterPoliticalParty,
        (master_political_party) => master_political_party.school,
        { cascade: true }
    )
    master_political_parties: MasterPoliticalParty[]
}
