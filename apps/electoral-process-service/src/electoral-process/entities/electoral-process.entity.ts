import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class ElectoralProcess {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('varchar',{
        length: 30
    })
    title:string;

    @Column('timestamp')
    start_date:Date;

    @Column('timestamp')
    end_date:Date;

    @Column('int')
    status: number;

    @Column('int',{
        name: 'school_id',
        nullable: false
    })
    schoolId: number;
}
