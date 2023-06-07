import { BaseResponse } from "src/utils/base.response";

export class StudentBasicResponse {
    id: number;
    identifier: string;
    name: string;
    lastName: string;
    age: number;
    dni: string;
    userId: number;
    politicalPartyId: number;
    clasroomId: number;
    rolId: number;
}

export class StudentReponse extends BaseResponse<StudentBasicResponse>{}