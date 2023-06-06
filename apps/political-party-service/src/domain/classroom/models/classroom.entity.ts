import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { School } from '../../school/models/school.entity';


@Entity()
export class Classroom {
    @PrimaryGeneratedColumn('increment')
    id:number;

    @Column('varchar',{
        length: 10,
    })
    name:string;

    @Column('varchar',{
        length: 5,
    })
    section:string;

    @Column('int')
    grade:number;

    @ManyToOne(
        () => School,
        ( school ) => school.classrooms,
    )
    @JoinColumn({ name: 'school_id' })
    school: School; 
}
