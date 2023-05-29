import { School } from "src/school/entities/school.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { MinLength } from 'class-validator';

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
}
