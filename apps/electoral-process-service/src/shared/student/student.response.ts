import { BaseResponse } from "src/utils/base.response";

export class StudentBasicResponse {
    id: number;
    identifier: string;
    name: string;
    lastName: string;
    age: number;
    dni: string;
}

export class StudentReponse extends BaseResponse<StudentBasicResponse>{}