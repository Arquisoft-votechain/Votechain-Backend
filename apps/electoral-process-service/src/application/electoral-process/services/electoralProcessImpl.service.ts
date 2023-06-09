import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PoliticalPartyClient } from '../../../shared/school/school.client';
import { ElectoralProcess, ElectoralProcessService, ProcessAdmin, ProcessAdminService, ProcessStudent, ProcessStudentService } from 'src/domain/index.domain';
import { ElectoralProcessBasicResponse, ElectoralProcessResponse } from '../dtos/electoralProcessResponse.dto';
import { ElectoralProcessRequest } from '../../index.application';
import { AdministratorBasicResponse } from 'src/shared/administrator/administrator.response';
import { StudentBasicResponse } from 'src/shared/student/student.response';
import { StudentClient } from 'src/shared/student/student.client';
import { AdminClient } from 'src/shared/administrator/administrator.client';
import { BaseResponse } from 'src/utils/base.response';
import { VoteDto, VoteResponse } from 'src/shared/votes/vote.dto';

@Injectable()
export class ElectoralProcessServiceImpl implements ElectoralProcessService, ProcessAdminService, ProcessStudentService {
  
  constructor(
    @InjectRepository(ElectoralProcess)
    private readonly electoralProcessRepository: Repository<ElectoralProcess>,
    @InjectRepository(ProcessAdmin)
    private readonly processAdminRepository: Repository<ProcessAdmin>,
    @InjectRepository(ProcessStudent)
    private readonly processStudentRepository: Repository<ProcessStudent>,
    private readonly politicalPartyClient: PoliticalPartyClient,
    private readonly studentClient: StudentClient,
    private readonly adminClient: AdminClient,
  ) { }

  async getVotesOfElectoralProcessById(electoralProcessId: number) {
    const politicalParticipants = await this.politicalPartyClient.getPoliticalPartyParticipantsByElectoralId(electoralProcessId);
    if(politicalParticipants.length === 0) 
    return new VoteResponse('The electoral process has 0 votes registered because there are not Political Party Participants or electoralProcessId not exist');

  
    var voteDto = new VoteDto();
    voteDto.votes = 0;

    for (const participant of politicalParticipants) {
    const votesCount = await this.studentClient.findCountVotesByPoliticalPartyParticipantId(participant.id);
    voteDto.votes += votesCount.votes;
  }

    return new VoteResponse('',voteDto);
  }
 
  async findOneElectoralProcessById(id: number): Promise<ElectoralProcessResponse> {
    try{
      const electoral = await this.electoralProcessRepository.findOneBy({id: id});
      if(!electoral) return new ElectoralProcessResponse(`An electoral process by id ${id} was not found`);
      
      return new ElectoralProcessResponse('',electoral);
    }catch(error){
      return new ElectoralProcessResponse('An error occurred while finding electoral process '+error.message)
    }
  }

  async assignStudentByIdAnElectoralProcessId(studentId: number, electoralId: number) {
    try{
      const electoralProcess = await this.electoralProcessRepository.findOneBy({id:electoralId});
      if(!electoralProcess) return new ElectoralProcessResponse(`A electoral process with id ${electoralId} was not found`);
      
      const student = await this.studentClient.getStudentById(studentId);
      if(!student.success) return new ElectoralProcessResponse(`A student with id ${studentId} was not found`);

      const processStudentExist = await this.processStudentRepository.findOne({
        where:{
          studentId: student.resource.id,
          electoralProcess: {
            id: electoralProcess.id
          }
        }
      })

      if(processStudentExist) return new ElectoralProcessResponse(`A student with id ${studentId} is already assigned to electoral process with id ${electoralId}`);

      const processStudent = await this.processStudentRepository.create();
      processStudent.electoralProcess = electoralProcess;
      processStudent.studentId = student.resource.id;

      return await this.processStudentRepository.save(processStudent);

    }catch(error){
      return new ElectoralProcessResponse('An error ocurred while assigning student with electoral-process: '+error.message);
    }
  }
  
  async unassignStudentByIdAnElectoralProcessId(studentId: number, electoralId: number) {
    try{
      const electoralProcess = await this.electoralProcessRepository.findOneBy({id:electoralId});
      if(!electoralProcess) return new ElectoralProcessResponse(`A electoral process with id ${electoralId} was not found`);

      const student = await this.studentClient.getStudentById(studentId);
      if(!student.success) return new ElectoralProcessResponse(`A student with id ${studentId} was not found`);

      const processStudent = await this.processStudentRepository.findOne({
        where:{
          studentId: student.resource.id,
          electoralProcess: {
            id: electoralProcess.id
          }
        }
      })

      if(!processStudent) return new ElectoralProcessResponse(`A student with id ${studentId} assigned to Electoral Process with id ${electoralId} not exist`);

      return await this.processStudentRepository.remove(processStudent);

    }catch(error){
      return new ElectoralProcessResponse('An error ocurred while unassigning student with electoral-process: '+error.message);
    }
  }
  
  async assignAdministratorByIdAnElectoralProcessId(adminId: number, electoralId: number) {
    try{
      const electoralProcess = await this.electoralProcessRepository.findOneBy({id:electoralId});
      if(!electoralProcess) return new ElectoralProcessResponse(`An electoral process with id ${electoralId} was not found`);

      const admin = await this.adminClient.getAdminById(adminId);
      if(!admin.success) return new ElectoralProcessResponse(`An administrator with id ${adminId} was not found`);

      const processAdminExist = await this.processAdminRepository.findOne({
        where:{
          adminId: admin.resource.id,
          electoralProcess: {
            id: electoralProcess.id
          }
        }
      })

      if(processAdminExist) return new ElectoralProcessResponse(`An administrator with id ${adminId} is already assigned to electoral process with id ${electoralId}`);

      const processAdmin = await this.processAdminRepository.create();
      processAdmin.electoralProcess = electoralProcess;
      processAdmin.adminId = admin.resource.id;

      return await this.processAdminRepository.save(processAdmin);

    }catch(error){
      return new ElectoralProcessResponse('An error ocurred while assigning admin with electoral-process: '+error.message);      
    }
  }
  
  async unassignAdministratorByIdAnElectoralProcessId(adminId: number, electoralId: number) {
    try{
      const electoralProcess = await this.electoralProcessRepository.findOneBy({id:electoralId});
      if(!electoralProcess) return new ElectoralProcessResponse(`A electoral process with id ${electoralId} was not found`);

      const admin = await this.adminClient.getAdminById(adminId);
      if(!admin.success) return new ElectoralProcessResponse(`An administrator with id ${adminId} was not found`);

      const processAdmin = await this.processAdminRepository.findOne({
        where:{
          adminId: admin.resource.id,
          electoralProcess: {
            id: electoralProcess.id
          }
        }
      })

      if(!processAdmin) return new ElectoralProcessResponse(`An admin with id ${adminId} assigned to Electoral Process with id ${electoralId} not exist`);

      return await this.processAdminRepository.remove(processAdmin);

    }catch(error){
      return new ElectoralProcessResponse('An error ocurred while unassigning admin with electoral-process: '+error.message);      
    }
  }

  async getStudentsByElectoralProcessId(electoralId: number): Promise<StudentBasicResponse[]> {
    const processStudents = await this.processStudentRepository.find({
      where:{
        electoralProcess:{
          id: electoralId}
        }
      }
    );
    
    var students: StudentBasicResponse[] = [];

    await Promise.all(
      processStudents.map(async (it) => {
        const student = await this.studentClient.getStudentById(it.studentId);
        students.push(student.resource);
      })
    )

    return students;
  }

  async getElectoralProcessesOfStudent(studentId: number): Promise<ElectoralProcessBasicResponse[]> {
    const processStudents = await this.processStudentRepository.find({
      where:{
        studentId: studentId
      },
      relations:['electoralProcess']
    }
    );


    var electoralProcess: ElectoralProcessBasicResponse[] = [];

    await Promise.all(
      processStudents.map(async (it) => {
        const electProcess = await this.electoralProcessRepository.findOneBy({id:it.electoralProcess.id});
        electoralProcess.push(electProcess);
      })
    )

    return electoralProcess;
  }
  
  async getAdministratorsByElectoralProcessId(electoralId: number): Promise<AdministratorBasicResponse[]> {
    const processAdmins = await this.processAdminRepository.find({
      where:{
        electoralProcess:{
          id: electoralId}
        }
      }
    );
    
    var admins: AdministratorBasicResponse[] = [];

    await Promise.all(
      processAdmins.map(async (it) => {
        const administrator = await this.adminClient.getAdminById(it.adminId);
        admins.push(administrator.resource);
      })
    );
    

    return admins;
  }

  ///////////////
  
  async createElectoralProcessBySchoolId(schoolId: number, electoraProcessRequest: ElectoralProcessRequest): Promise<ElectoralProcessResponse> {
    try {

      const schoolResponse = await this.politicalPartyClient.getSchoolById(schoolId);

      if (schoolResponse.success == false) {
        return new ElectoralProcessResponse(schoolResponse.message);
      }

      electoraProcessRequest.end_date = new Date(electoraProcessRequest.end_date);
      electoraProcessRequest.start_date = new Date(electoraProcessRequest.start_date);

      const electoralProcessPreload = this.electoralProcessRepository.create(electoraProcessRequest);

      electoralProcessPreload.schoolId = schoolResponse.resource.id;

      const electoralProcess = await this.electoralProcessRepository.save(electoralProcessPreload);

      return new ElectoralProcessResponse('', electoralProcess);

    } catch (error) {
      return new ElectoralProcessResponse('An error occurred while creating Electoral Process: ' + error);
    }
  }

  async findElectoralProcessBySchoolIdAndId(schoolId: number, id: number): Promise<ElectoralProcessResponse> {
    try {

      const schoolResponse = await this.politicalPartyClient.getSchoolById(schoolId);
      
      if (schoolResponse.success == false) {
        return new ElectoralProcessResponse(schoolResponse.message);
      }

      const electoralProcess = await this.electoralProcessRepository.findOneBy({ schoolId: schoolId, id: id });
      if (!electoralProcess) return new ElectoralProcessResponse(`An electoral process was not found by schoolId ${schoolId} and Id ${id}]`);

      return new ElectoralProcessResponse('', electoralProcess);

    } catch (error) {
      return new ElectoralProcessResponse('An error occurred while finding Electoral Process: ' + error.message);
    }

  }

  async updateElectoralProcessBySchoolIdAndId(schoolId: number, id: number, electoralProcessRequest: ElectoralProcessRequest): Promise<ElectoralProcessResponse> {
    try {
      const schoolResponse = await this.politicalPartyClient.getSchoolById(schoolId);

      if (schoolResponse.success == false) {
        return new ElectoralProcessResponse(schoolResponse.message);
      }

      const electoralProcess = await this.electoralProcessRepository.findOneBy({ schoolId: schoolId, id: id });
      if (!electoralProcess) return new ElectoralProcessResponse(`An electoral process was not found by schoolId ${schoolId} and Id ${id}]`);

      const electoralProcessPreload = await this.electoralProcessRepository.preload({
        id: electoralProcess.id,
        schoolId: schoolId,
        ...electoralProcessRequest
      })

      const updatedElectoralProcess = await this.electoralProcessRepository.save(electoralProcessPreload);

      return new ElectoralProcessResponse('', updatedElectoralProcess);

    } catch (error) {
      return new ElectoralProcessResponse('An error occurred while updating Electoral Process: ' + error);
    }
  }

  async deleteElectoralProcessBySchoolIdAndId(schoolId: number, id: number): Promise<ElectoralProcessResponse> {
    try {
      const schoolResponse = await this.politicalPartyClient.getSchoolById(schoolId);

      if (schoolResponse.success == false) {
        return new ElectoralProcessResponse(schoolResponse.message);
      }

      const electoralProcess = await this.electoralProcessRepository.findOneBy({ schoolId: schoolId, id: id });
      if (!electoralProcess) return new ElectoralProcessResponse(`An electoral process was not found by schoolId ${schoolId} and Id ${id}]`);

      const epdeleted = await this.electoralProcessRepository.remove(electoralProcess);

      return new ElectoralProcessResponse('', epdeleted);

    } catch (error) {
      return new ElectoralProcessResponse('An error occurred while removing Electoral Process: ' + error);
    }
  }


  async findAllElectoralProcessesBySchoolId(schoolId: number) {
    return this.electoralProcessRepository.find({ where: { schoolId: schoolId } })
  }

}
