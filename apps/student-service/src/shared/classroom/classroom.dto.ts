import { BaseResponse } from "src/utils/base.response";

export class ClassroomDto{
    id: number;
    name: string;
    section: string;
    grade:number;
}

export class ClassroomResponse extends BaseResponse<ClassroomDto>{
    
}