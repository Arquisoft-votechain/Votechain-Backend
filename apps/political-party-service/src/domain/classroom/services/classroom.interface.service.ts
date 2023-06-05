import { ClassroomBasicResponse,ClassroomResponse } from "src/application/index.application";


export interface ClassroomService {
    getAllClassrooms(): Promise<ClassroomBasicResponse[]>;
    getClassroomById(id: number): Promise<ClassroomResponse>;
}