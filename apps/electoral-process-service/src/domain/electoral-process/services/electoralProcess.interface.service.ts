import { ElectoralProcessBasicResponse, ElectoralProcessRequest, ElectoralProcessResponse } from "src/application/index.application";

export interface ElectoralProcessService{
    createElectoralProcessBySchoolId(schoolId: number, electoraProcessRequest: ElectoralProcessRequest): Promise<ElectoralProcessResponse>;
    findAllElectoralProcessesBySchoolId(schoolId: number): Promise<ElectoralProcessBasicResponse[]>;
    findAllElectoralProcessesWithVotesBySchoolId(schoolId: number);
    findElectoralProcessBySchoolIdAndId(schoolId: number, id: number): Promise<ElectoralProcessResponse>;
    updateElectoralProcessBySchoolIdAndId(schoolId: number, id: number, electoraProcessRequest: ElectoralProcessRequest): Promise<ElectoralProcessResponse>;
    deleteElectoralProcessBySchoolIdAndId(schoolId: number, id: number): Promise<ElectoralProcessResponse>;
    getElectoralProcessesOfStudent(studentId: number): Promise<ElectoralProcessBasicResponse[]>;
    getVotesOfElectoralProcessById(electoralProcessId: number);
    getPoliticalParticipantsWithVotesByElectoralId(electoralProcessId: number);
}