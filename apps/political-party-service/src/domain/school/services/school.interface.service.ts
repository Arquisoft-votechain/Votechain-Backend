import { 
    ClassroomBasicResponse, 
    ClassroomRequest, 
    ClassroomResponse, 
    MasterPoliticalBasicResponse, 
    MasterPoliticalRequest, 
    MasterPoliticalResponse, 
    SchoolBasicResponse, 
    SchoolRequest, 
    SchoolResponse } from "src/application/index.application";

export interface SchoolService {
    createSchool(schoolRequest: SchoolRequest): Promise<SchoolResponse>;
    createClassroomBySchoolId(schoolId: number, classroomRequest: ClassroomRequest): Promise<ClassroomResponse>;
    createMasterPoliticalPartyBySchoolId(schoolId: number, masterPolitical: MasterPoliticalRequest): Promise<MasterPoliticalResponse>;

    getAllSchools(): Promise<SchoolBasicResponse[]>;
    getSchoolById(id: number): Promise<SchoolResponse>;
    getAllClassroomsBySchoolId(schoolId: number): Promise<ClassroomBasicResponse[]|ClassroomResponse>;
    getAllMasterPoliticalPartiesBySchoolId(schoolId: number): Promise<MasterPoliticalBasicResponse[]|MasterPoliticalResponse>;

    updateSchoolById(id: number, schoolReques: SchoolRequest): Promise<SchoolResponse>;
    updateClassroomBySchoolIdAndId(schoolId: number, id: number, classroomRequest: ClassroomRequest): Promise<ClassroomResponse>,
    updateMasterPoliticalBySchoolIdAndId(schoolId: number, id: number, masterPoliticalRequest: MasterPoliticalRequest): Promise<MasterPoliticalResponse>

    deleteSchoolById(id: number): Promise<SchoolResponse>;
    deleteClassroomBySchoolIdAndId(schoolId: number, id: number): Promise<ClassroomResponse>;
    deleteMasterPoliticalBySchoolIdAndId(schoolId: number, id: number): Promise<MasterPoliticalResponse>;
    
}