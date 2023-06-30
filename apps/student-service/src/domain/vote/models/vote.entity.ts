import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('vote')
export class Vote {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('varchar',{
        length: 200,
        name: 'blockchain_code',
        nullable: true
    })
    blockchainCode: string;

    @Column('timestamp',{
        name: 'registered_date'
    })
    registeredDate: Date;

    @Column('int', {
        name: 'student_id',
        nullable: false
    })
    studentId: number;

    @Column('int', {
        name: 'political_party_id',
        nullable: false
    })
    politicalPartyId: number;

    @Column('int', {
        name: 'electoral_process_id',
        nullable: false
    })
    electoralProcessId: number;
}
