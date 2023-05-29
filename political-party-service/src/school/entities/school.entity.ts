import { Classroom } from "src/classroom/entities/classroom.entity";
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
}
