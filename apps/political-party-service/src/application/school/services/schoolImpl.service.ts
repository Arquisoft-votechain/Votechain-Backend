import { ClassroomResponse, MasterPoliticalResponse, ClassroomBasicResponse, MasterPoliticalBasicResponse, ClassroomRequest, MasterPoliticalRequest } from "src/application/index.application";
import { Classroom, MasterPoliticalParty, School, SchoolService } from "src/domain/index.domain";
import { SchoolRequest } from "../dtos/schoolRequest.dto";
import { SchoolResponse, SchoolBasicResponse } from "../dtos/schoolResponse.dto";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { plainToInstance } from "class-transformer";
import { StudentBasicResponse, StudentReponse } from "src/shared/student/student.response";
import { StudentClient } from "src/shared/student/student.client";

@Injectable()
export class SchoolServiceImpl implements SchoolService {

    constructor(
        @InjectRepository(School)
        private readonly schoolRepository: Repository<School>,
        @InjectRepository(Classroom)
        private readonly classroomRepository: Repository<Classroom>,
        @InjectRepository(MasterPoliticalParty)
        private readonly masterPoliticalPartyRepository: Repository<MasterPoliticalParty>,
        private readonly studentClient: StudentClient
    ) { }


    async createSchool(schoolRequest: SchoolRequest): Promise<SchoolResponse> {
        try {
            const schoolPreload = this.schoolRepository.create(schoolRequest);
            const school = await this.schoolRepository.save(schoolPreload);

            return new SchoolResponse('', school);
        } catch (error) {
            return new SchoolResponse('An error occurred while creating school: ' + error);
        }
    }

    async createClassroomBySchoolId(schoolId: number, classroomRequest: ClassroomRequest): Promise<ClassroomResponse> {
        try {
            const school = await this.schoolRepository.findOneBy({ id: schoolId });
            if (!school) return new ClassroomResponse(`A school with id ${schoolId} was not found`);

            const classroomPreload = this.classroomRepository.create(classroomRequest);
            classroomPreload.school = school;

            const classroom = await this.classroomRepository.save(classroomPreload);
            const mappedClassroom = plainToInstance(ClassroomBasicResponse, classroom);
            mappedClassroom.school_id = school.id;

            return new ClassroomResponse('', mappedClassroom);

        } catch (error) {
            return new ClassroomResponse('An error occurred while creating classroom: ' + error)
        }
    }

    async createMasterPoliticalPartyBySchoolId(schoolId: number, masterPolitical: MasterPoliticalRequest): Promise<MasterPoliticalResponse> {
        try {
            const school = await this.schoolRepository.findOneBy({ id: schoolId });
            if (!school) return new MasterPoliticalResponse(`School with id ${schoolId} was not found`);

            const masterPPpreload = this.masterPoliticalPartyRepository.create(masterPolitical);
            masterPPpreload.school = school;

            const masterPP = await this.masterPoliticalPartyRepository.save(masterPPpreload);

            return new MasterPoliticalResponse('', masterPP);
        }
        catch (error) {
            return new MasterPoliticalResponse('An error occurred while creating master-political-party: ' + error);
        }
    }

    async getAllSchools(): Promise<SchoolBasicResponse[]> {
        const schools = await this.schoolRepository.find({});
        return schools;
    }

    async getSchoolById(id: number): Promise<SchoolResponse> {
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

    async getAllClassroomsBySchoolId(schoolId: number): Promise<ClassroomBasicResponse[] | ClassroomResponse> {
        const school = await this.schoolRepository.findOneBy({ id: schoolId });
        if (!school) return new ClassroomResponse(`A school with id ${schoolId} was not found`);

        const classrooms = await this.classroomRepository.find({
            where: {
                school: {
                    id: schoolId
                }
            },
            relations: ['school']
        });

        const mappedClassrooms = plainToInstance(ClassroomBasicResponse, classrooms);

        mappedClassrooms.forEach((classroom, index) => {
            classroom.school_id = classrooms[index].school.id;
        });

        return mappedClassrooms;
    }

    async getAllStudentsBySchoolId(schoolId: number): Promise<StudentBasicResponse[] | StudentReponse> {
        const school = await this.schoolRepository.findOneBy({ id: schoolId });
        if (!school) return new StudentReponse(`A school with id ${schoolId} was not found`);

        const classrooms = await this.classroomRepository.find({
            where: {
                school: {
                    id: schoolId
                }
            },
            relations: ['school']
        });

        var students = [];

        await Promise.all(
            classrooms.map(async (it) => {
      
              const studentsByClassroom = await this.studentClient.getStudentsByClassroomId(it.id);
              students.push(...studentsByClassroom);

            })
          )
        
          return students;
    }

    async getAllMasterPoliticalPartiesBySchoolId(schoolId: number): Promise<MasterPoliticalBasicResponse[] | MasterPoliticalResponse> {
        try {
            const school = await this.schoolRepository.findOneBy({ id: schoolId });

            if (!school) return new MasterPoliticalResponse(`A school with id ${schoolId} was not found`);

            const masterPPs = await this.masterPoliticalPartyRepository.find({
                where: {
                    school: {
                        id: schoolId
                    }
                }
            })

            return masterPPs;
        } catch (error) {
            return new MasterPoliticalResponse('An error ocurred while finding MasterPPs by schoolId ' + schoolId + ': ' + error.message);
        }
    }

    async updateSchoolById(id: number, schoolRequest: SchoolRequest): Promise<SchoolResponse> {
        try {

            const school = await this.schoolRepository.findOneBy({ id });

            if (!school) return new SchoolResponse(`A school with id ${id} was not found`);

            const schoolPreload = await this.schoolRepository.preload({
                id: school.id,
                ...schoolRequest
            })

            const updatedSchool = await this.schoolRepository.save(schoolPreload);

            return new SchoolResponse('', updatedSchool);

        } catch (error) {
            return new SchoolResponse('An error ocurred while updating School by Id ' + id + ': ' + error.message);
        }

    }

    async updateClassroomBySchoolIdAndId(schoolId: number, id: number, classroomRequest: ClassroomRequest): Promise<ClassroomResponse> {
        try {
            const school = await this.schoolRepository.findOneBy({ id: schoolId });
            if (!school) return new ClassroomResponse(`A school with id ${schoolId} was not found`);

            const classroom = await this.classroomRepository.findOneBy({
                id: id,
                school: {
                    id: school.id
                }
            })

            if (!classroom) return new ClassroomResponse(`A classroom with id ${id} and schoolId ${schoolId} was not found`);

            const clasroomPreload = await this.classroomRepository.preload({
                id: classroom.id,
                school: classroom.school,
                ...classroomRequest
            })

            const classroomUpdated = await this.classroomRepository.save(clasroomPreload);

            const mappedClassroom = plainToInstance(ClassroomBasicResponse, classroomUpdated);
            mappedClassroom.school_id = classroom.school.id;


            return new ClassroomResponse('', mappedClassroom);
        }
        catch (error) {
            return new ClassroomResponse(`An error occurred while updating Classroom by Id ${id} and
              schoolId ${schoolId}: ` + error.message);
        }
    }

    async updateMasterPoliticalBySchoolIdAndId(schoolId: number, id: number, masterPoliticalRequest: MasterPoliticalRequest): Promise<MasterPoliticalResponse> {
        try {
            const school = await this.schoolRepository.findOneBy({ id: schoolId });
            if (!school) return new MasterPoliticalResponse(`School with id ${schoolId} was not found`);

            const masterPP = await this.masterPoliticalPartyRepository.findOneBy({
                id: id,
                school: {
                    id: schoolId
                }
            })

            if (!masterPP) return new MasterPoliticalResponse(`Master Political Party with id ${id} and schoolId ${schoolId} was not found`);

            const masterPPpreload = await this.masterPoliticalPartyRepository.preload({
                id: masterPP.id,
                school: masterPP.school,
                ...masterPoliticalRequest
            })

            const masterPPupdated = await this.masterPoliticalPartyRepository.save(masterPPpreload);

            return new MasterPoliticalResponse('', masterPPupdated);
        }
        catch (error) {
            return new MasterPoliticalResponse(`An error ocurred while updating Master Political Party by Id ${id} and
              schoolId ${schoolId}: ` + error.message);
        }
    }

    async deleteSchoolById(id: number): Promise<SchoolResponse> {
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
            if (!school) return new ClassroomResponse(`A school with id ${id} was not found`);

            const classroom = await this.classroomRepository.findOneBy({
                id: id,
                school: {
                    id: school.id
                }
            })

            if (!classroom) return new ClassroomResponse(`A classroom with id ${id} and schoolId ${schoolId} was not found`);

            const clasroomDeleted = await this.classroomRepository.remove(classroom);

            const mappedClassroom = plainToInstance(ClassroomBasicResponse, clasroomDeleted);
            mappedClassroom.school_id = classroom.school.id;

            return new ClassroomResponse('', mappedClassroom);

        } catch (error) {
            return new ClassroomResponse(`An error ocurred while deleting Classroom by Id ${id} and
              schoolId ${schoolId}: ` + error.message);
        }
    }

    async deleteMasterPoliticalBySchoolIdAndId(schoolId: number, id: number): Promise<MasterPoliticalResponse> {
        try {
            const school = await this.schoolRepository.findOneBy({ id: schoolId });
            if (!school) return new MasterPoliticalResponse(`A school with id ${id} was not found`);

            const masterPP = await this.masterPoliticalPartyRepository.findOneBy({
                id: id,
                school: {
                    id: school.id
                }
            })

            if (!masterPP) return new MasterPoliticalResponse(`Master political party with id ${id} and schoolId ${schoolId} was not found`)

            const masterPPDeleted = await this.masterPoliticalPartyRepository.remove(masterPP);
            return new MasterPoliticalResponse('', masterPPDeleted);

        } catch (error) {

            return new MasterPoliticalResponse(`An error ocurred while deleting Master Political Party by Id ${id} and
              schoolId ${schoolId}: ` + error.message);
        }
    }

}