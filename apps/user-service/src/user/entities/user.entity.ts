import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert} from "typeorm";
import { hash, compare } from 'bcrypt';
@Entity('user')
export class User {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('varchar',{
        length: 25,
        unique: true
    })
    email: string;

    @Column('varchar',{
        length: 25
    })
    password: string;
    
}
