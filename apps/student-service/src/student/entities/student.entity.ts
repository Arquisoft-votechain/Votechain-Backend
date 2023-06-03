import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity('student')
export class Student {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('varchar',{
        length: 15
    })
    name: string;

    @Column('varchar',{
        length: 15
    })
    lastName: string;

    @Column('int')
    age: number;

    @Column('varchar',{
        length: 10
    })
    identifier: string;

    @Column('varchar',{
        length: 10
    })
    dni: string;

    @Column('int',{
        name: 'user_id',
        nullable: true
    })
    userId: number;

    @Column('int',{
        name: 'politicalparty_id',
        nullable: true
    })
    politicalPartyId: number;

    @Column('int',{
        name: 'classroom_id',
        nullable: true
    })
    classroomId: number;

    @Column('int',{
        name: 'rol_id',
        nullable: true
    })
    rolId: number;
}
