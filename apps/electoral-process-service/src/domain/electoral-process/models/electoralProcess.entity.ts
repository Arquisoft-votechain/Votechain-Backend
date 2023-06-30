import { ProcessAdmin } from 'src/domain/process-admin/models/processAdmin.entity';
import { ProcessStudent } from 'src/domain/process-student/models/processStudent.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class ElectoralProcess {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('varchar', {
        length: 30
    })
    title: string;

    @Column('timestamp')
    start_date: Date;

    @Column('timestamp')
    end_date: Date;

    @Column('int')
    status: number;

    @Column('int', {
        name: 'school_id',
        nullable: false
    })
    schoolId: number;

    @Column('varchar', {
        name: 'smart_contract_address',
        nullable: true
    })
    smartContractAddress: string;

    @OneToMany(
        () => ProcessStudent,
        (process_student) => process_student.electoralProcess,
        { cascade: true }
    )
    processStudents: ProcessStudent[];

    @OneToMany(
        () => ProcessAdmin,
        (process_admin) => process_admin.electoralProcess,
        { cascade: true }
    )
    processAdmins: ProcessAdmin[];
}


