import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
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
}
