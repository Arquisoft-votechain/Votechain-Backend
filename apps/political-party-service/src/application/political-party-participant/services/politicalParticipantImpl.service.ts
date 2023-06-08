import { PoliticalPartyParticipant, PoliticalPartyParticipantService } from "src/domain/index.domain";
import { PoliticalPartyPariticipantResponse, PoliticalPartyParticipantBasicResponse } from "../dtos/politicalParticipantResponse.dtos";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { StudentClient } from "src/shared/student/student.client";

@Injectable()
export class PoliticalPartyParticipantServiceImpl implements PoliticalPartyParticipantService {

    constructor(
        @InjectRepository(PoliticalPartyParticipant)
        private readonly politicalPartyParticipantRepository: Repository<PoliticalPartyParticipant>,
        private readonly studentClient: StudentClient
    ) { }
    
    async getPoliticalPartyParticipantsByElectoralId(electoralId: number): Promise<PoliticalPartyParticipantBasicResponse[]> {
        const politicalPartyParticipants = this.politicalPartyParticipantRepository.find(
            {where: {electoral_process_id: electoralId},relations:['master_political_party']});
        return politicalPartyParticipants;
    }

    async assignStudentToPoliticalPartyParticipant(politicalParticipantId: number, studentId: number) {
        try {
            const student = await this.studentClient.getStudentById(studentId);
            
            if (!student.success) return new PoliticalPartyPariticipantResponse(`A student with id ${studentId} was not found`);
            

            if (student.resource.rolId === null) return new PoliticalPartyPariticipantResponse('The student must have a rol assigned');

            const participant = await this.politicalPartyParticipantRepository.findOneBy({ id: politicalParticipantId });

            if (!participant) return new PoliticalPartyPariticipantResponse('A political party participant was not found by Id: ' + politicalParticipantId);

            if(student.resource.politicalPartyId === participant.id) return new PoliticalPartyPariticipantResponse('The student is already part of this Political Party Participant');

            student.resource.politicalPartyId = participant.id;
            const updatedStudent = await this.studentClient.updateStudentById(student.resource, student.resource.id);

            if (!updatedStudent.success) return new PoliticalPartyPariticipantResponse('An error occurred updating student->political-party-Id');

            return updatedStudent;
        } catch (error) {
            return new PoliticalPartyPariticipantResponse('An error occurred while assigning student to Political Party Participant: ' + error.message);
        }
    }

    async unassignStudentToPoliticalPartyParticipant(politicalParticipantId: number, studentId: number) {
        try {
            const student = await this.studentClient.getStudentById(studentId);
            if (!student.success) return new PoliticalPartyPariticipantResponse(`A student with id ${studentId} was not found`);

            if (student.resource.rolId === null) return new PoliticalPartyPariticipantResponse('The student must have a rol assigned');

            const participant = await this.politicalPartyParticipantRepository.findOneBy({ id: politicalParticipantId });

            if (!participant) return new PoliticalPartyPariticipantResponse('A political party participant was not found by Id: ' + politicalParticipantId);

            if (student.resource.politicalPartyId === participant.id) {
                student.resource.politicalPartyId = null;
                const updatedStudent = await this.studentClient.updateStudentById(student.resource, student.resource.id);

                if (!updatedStudent.success) return new PoliticalPartyPariticipantResponse('An error occurred updating student->political-party-Id');

                return updatedStudent;
            }
            else{
                return new PoliticalPartyPariticipantResponse('The student is not part of this Political Party Participant');
            }
  
        } catch (error) {
            return new PoliticalPartyPariticipantResponse('An error occurred while unassigning student to Political Party Participant: ' + error.message);
        }
    }

    async findByMasterIdElectoralProcessIdAndDate(masterId: number, electoralId: number, assignedDate: Date): Promise<PoliticalPartyParticipantBasicResponse[]> {

        const ppps = await this.politicalPartyParticipantRepository.find(
            {
                where: {
                    master_political_party: { id: masterId },
                    electoral_process_id: electoralId,
                    assigned_at: this.getSpecificDate(assignedDate),
                }
            })

        return ppps;
    }

    getSpecificDate(date: Date): Date {
        const specificDate = new Date(date);
        specificDate.setHours(0, 0, 0, 0); // Establece las horas, minutos, segundos y milisegundos a cero
        return specificDate;
    }

    async findOneById(politicalPartyId: number) {
        const politicalPartyExist = await this.politicalPartyParticipantRepository.findOne({where: {id: politicalPartyId}})
        return new PoliticalPartyPariticipantResponse('',politicalPartyExist);
    }

}