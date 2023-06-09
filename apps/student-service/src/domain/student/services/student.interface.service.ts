import { CreateStudentDto, UpdateStudentDto } from "src/application/index.application";
import { Student } from "../models/student.entity";

export interface StudentService{
    create(createStudentDto: CreateStudentDto): Promise<Student>;
    findOne(id: number);
    findByDNI(dniStudent: any);
    findByUserId(userId: any);
    findByClassroomId(id: any, classroomId: any);
    findAllByClassroomId(classroomId: any);
    update(id: number, updateStudentDto: UpdateStudentDto);
    remove(id: any): Promise<void>;
    getStudentsByPoliticalPartyParticipantId(politicalPartyParticipantId: number);
}