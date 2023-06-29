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
        length: 200
    })
    password: string;

    @Column('bool',{
        default: true,
        nullable: true
    })
    enabled: boolean;
    
    @Column('bool',{
        name: 'is_admin',
        default: false,
        nullable: true
    })
    isAdmin: boolean;
}
