import { ElectoralProcess } from 'src/domain/index.domain';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class ProcessAdmin {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('int', { nullable: false, name: 'admin_id' })
    adminId: number;

    @ManyToOne(
        () => ElectoralProcess,
        (electoralProcess) => electoralProcess.processStudents,
    )
    @JoinColumn({ name: 'electoral_process_id' })
    electoralProcess: ElectoralProcess;
}