import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class School {
    @PrimaryGeneratedColumn('increment')
    id:number;

    @Column('varchar',{
        length: 25,
        unique: true
    })
    name:string;
}
