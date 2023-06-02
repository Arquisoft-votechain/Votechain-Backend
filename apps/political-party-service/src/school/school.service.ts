import { Injectable, NotFoundException } from '@nestjs/common';
import { RequestSchoolDto } from './dto/request-school.dto';
import { ResponseSchoolDto } from './dto/response-school.dto';
import { School } from './entities/school.entity';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Classroom } from 'src/classroom/entities/classroom.entity';
import { RequestClassroomDto } from 'src/classroom/dto/request-classroom.dto';
import { MasterPoliticalParty } from 'src/master-political-party/entities/master-political-party.entity';
import { RequestMasterPoliticalPartyDto } from 'src/master-political-party/dto/request-master-political-party.dto';
import { SchoolResponse } from './dto/school.reponse';
import { ClassroomResponse } from 'src/classroom/dto/classroom.response';
import { MasterPoliticalPartyResponse } from 'src/master-political-party/dto/master-political-party.response';

@Injectable()
export class SchoolService {

  constructor(
    @InjectRepository(School)
    private readonly schoolRepository: Repository<School>,
    @InjectRepository(Classroom)
    private readonly classroomRepository: Repository<Classroom>,
    @InjectRepository(MasterPoliticalParty)
    private readonly masterPoliticalPartyRepository: Repository<MasterPoliticalParty>,
  ) {

  }

  async createSchool(requestSchoolDto: RequestSchoolDto): Promise<SchoolResponse> {
    try {
      const schoolPreload = this.schoolRepository.create(requestSchoolDto);
      const school = await this.schoolRepository.save(schoolPreload);
      return new SchoolResponse('', school);
    } catch (error) {
      return new SchoolResponse('An error occurred while creating school: ' + error);
    }
  }

  async createClassroomBySchoolId(id: number, requestClassroomDto: RequestClassroomDto): Promise<ClassroomResponse> {
    try {
      const school = await this.schoolRepository.findOneBy({ id });
      if (!school) return new ClassroomResponse(`School with id ${id} was not found`);

      const classroomPreload = this.classroomRepository.create(requestClassroomDto);
      classroomPreload.school = school;

      const classroom = await this.classroomRepository.save(classroomPreload);

      return new ClassroomResponse('', classroom);

    } catch (error) {
      return new ClassroomResponse('An error occurred while creating classroom: ' + error)
    }
  }

  async createMasterPoliticalPartyBySchoolId(id: number,
    requestMasterPoliticalPartyDto: RequestMasterPoliticalPartyDto): Promise<MasterPoliticalPartyResponse> {

    try {
      const school = await this.schoolRepository.findOneBy({ id });
      if (!school) return new MasterPoliticalPartyResponse(`School with id ${id} was not found`);

      const masterPPpreload = this.masterPoliticalPartyRepository.create(requestMasterPoliticalPartyDto);
      masterPPpreload.school = school;

      const masterPP = await this.masterPoliticalPartyRepository.save(masterPPpreload);

      return new MasterPoliticalPartyResponse('', masterPP);
    }
    catch (error) {
      return new MasterPoliticalPartyResponse('An error occurred while creating master-political-party: ' + error);
    }

  }

  async findAllSchools() {
    try {
      const schools = await this.schoolRepository.find({});
      return schools;
    } catch (error) {
      return new SchoolResponse('An error occurred while finding all schools: ' + error);
    }
  }

  async findOneSchoolById(id: number): Promise<SchoolResponse> {

    try {
      const school = await this.schoolRepository.findOneBy({ id });

      if (!school) {
        return new SchoolResponse(`A school was not found by id ${id}`)
      }
      return new SchoolResponse('', school);
    }
    catch (error) {
      return new SchoolResponse('An error ocurred while finding a school: ' + error.message);
    }

  }

  async findAllClassroomsBySchoolId(id: number) {

    try {
      const school = await this.schoolRepository.findOneBy({ id });
      if (!school) return new ClassroomResponse(`School with id ${id} was not found`);

      const clasrooms = await this.classroomRepository.find({
        where: {
          school: {
            id: id
          }
        }
      });

      return clasrooms;

    } catch (error) {
      return new ClassroomResponse('An error ocurred while finding classrooms by schoolId ' + id + ': ' + error.message);
    }

  }

  async findAllMasterPoliticalPartiesBySchoolId(id: number) {

    try {
      const school = await this.schoolRepository.findOneBy({ id });

      if (!school) return new MasterPoliticalPartyResponse(`School with id ${id} was not found`);

      const masterPPs = await this.masterPoliticalPartyRepository.find({
        where: {
          school: {
            id: id
          }
        }
      })

      return masterPPs;
    } catch (error) {
      return new MasterPoliticalPartyResponse('An error ocurred while finding MasterPPs by schoolId ' + id + ': ' + error.message);
    }
  }

  async updateSchoolById(id: number, requestSchoolDto: RequestSchoolDto): Promise<SchoolResponse> {

    try {

      const school = await this.schoolRepository.findOneBy({ id });

      if (!school) return new SchoolResponse(`School with id ${id} was not found`);

      const schoolPreload = await this.schoolRepository.preload({
        id: school.id,
        ...requestSchoolDto
      })

      const updatedSchool = await this.schoolRepository.save(schoolPreload);

      return new SchoolResponse('', updatedSchool);

    } catch (error) {
      return new SchoolResponse('An error ocurred while updating School by Id ' + id + ': ' + error.message);
    }

  }

  async updateClassroomBySchoolIdAndId(schoolId: number,
    id: number,
    requestClassroomDto: RequestClassroomDto): Promise<ClassroomResponse> {

    try {
      const school = await this.schoolRepository.findOneBy({ id: schoolId });
      if (!school) return new ClassroomResponse(`School with id ${schoolId} was not found`);

      const classroom = await this.classroomRepository.findOneBy({
        id: id,
        school: {
          id: school.id
        }
      })

      if (!classroom) return new ClassroomResponse(`Classroom with id ${id} was not found`);

      const clasroomPreload = await this.classroomRepository.preload({
        id: classroom.id,
        school: classroom.school,
        ...requestClassroomDto
      })

      const classroomUpdated = await this.classroomRepository.save(clasroomPreload);

      return new ClassroomResponse('', classroomUpdated);
    }
    catch (error) {
      return new ClassroomResponse(`An error ocurred while updating Classroom by Id ${id} and
        schoolId ${schoolId}: ` + error.message);
    }

  }

  async updateMasterPPBySchoolIdAndId(schoolId: number,
    id: number,
    requestMasterPoliticalPartyDto: RequestMasterPoliticalPartyDto): Promise<MasterPoliticalPartyResponse> {

    try {
      const school = await this.schoolRepository.findOneBy({ id: schoolId });
      if (!school) return new MasterPoliticalPartyResponse(`School with id ${schoolId} was not found`);

      const masterPP = await this.masterPoliticalPartyRepository.findOneBy({
        id: id,
        school: {
          id: schoolId
        }
      })

      if (!masterPP) return new MasterPoliticalPartyResponse(`Master Political Party with id ${id} was not found`);

      const masterPPpreload = await this.masterPoliticalPartyRepository.preload({
        id: masterPP.id,
        school: masterPP.school,
        ...requestMasterPoliticalPartyDto
      })

      const masterPPupdated = await this.masterPoliticalPartyRepository.save(masterPPpreload);

      return new MasterPoliticalPartyResponse('', masterPPupdated);
    }
    catch (error) {
      return new MasterPoliticalPartyResponse(`An error ocurred while updating Master Political Party by Id ${id} and
        schoolId ${schoolId}: ` + error.message);
    }
  }

  async removeSchoolById(id: number): Promise<SchoolResponse> {

    try {
      const school = await this.schoolRepository.findOneBy({ id });
      if (!school) return new SchoolResponse(`School with id ${id} was not found`);

      const schoolDeleted = await this.schoolRepository.remove(school);

      return new SchoolResponse('', schoolDeleted);

    } catch (error) {
      return new SchoolResponse('An error ocurred while deleting School by Id ' + id + ': ' + error.message);
    }

  }

  async deleteClassroomBySchoolIdAndId(schoolId: number, id: number): Promise<ClassroomResponse> {

    try {
      const school = await this.schoolRepository.findOneBy({ id: schoolId });
      if (!school) return new ClassroomResponse(`School with id ${id} was not found`);

      const classroom = await this.classroomRepository.findOneBy({
        id: id,
        school: {
          id: school.id
        }
      })

      if (!classroom) return new ClassroomResponse(`Classroom with id ${id} not found`);

      const clasroomDeleted = await this.classroomRepository.remove(classroom);

      return new ClassroomResponse('', clasroomDeleted);

    } catch (error) {
      return new ClassroomResponse(`An error ocurred while deleting Classroom by Id ${id} and
        schoolId ${schoolId}: ` + error.message);
    }



  }

  async deleteMasterPPBySchoolIdAndId(schoolId: number, id: number): Promise<MasterPoliticalPartyResponse> {

    try {
      const school = await this.schoolRepository.findOneBy({ id: schoolId });
      if (!school) return new MasterPoliticalPartyResponse(`School with id ${id} was not found`);

      const masterPP = await this.masterPoliticalPartyRepository.findOneBy({
        id: id,
        school: {
          id: school.id
        }
      })

      if (!masterPP) return new MasterPoliticalPartyResponse(`Master political party with id ${id} was not found`)

      const masterPPDeleted = await this.masterPoliticalPartyRepository.remove(masterPP);

      return new MasterPoliticalPartyResponse('', masterPPDeleted);

    } catch (error) {

      return new MasterPoliticalPartyResponse(`An error ocurred while deleting Master Political Party by Id ${id} and
        schoolId ${schoolId}: ` + error.message);
    }
  }

}
