import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Role {

    @PrimaryGeneratedColumn('increment')
    id:number;

    @Column('varchar',{
        length: 25,
        unique: true
    })
    name:string;


}
