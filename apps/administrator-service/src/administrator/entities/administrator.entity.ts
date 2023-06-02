import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity('administrator')
export class Administrator{

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
        nullable: false
    })
    userId: number;
}
