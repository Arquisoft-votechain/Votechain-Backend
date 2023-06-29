import { StudentBasicResponse } from "src/shared/student/student.response";

export interface ProcessStudentService {
    getStudentsByElectoralProcessId(electoralId: number): Promise<StudentBasicResponse[]>;
    assignStudentByIdAnElectoralProcessId(studentId: number, electoralId: number);
    unassignStudentByIdAnElectoralProcessId(studentId: number, electoralId: number);
}