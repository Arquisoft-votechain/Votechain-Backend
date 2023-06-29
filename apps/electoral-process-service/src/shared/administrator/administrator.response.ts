import { BaseResponse } from "src/utils/base.response";

export class AdministratorBasicResponse {
    id: number;
    identifier: string;
    name: string;
    lastName: string;
    age: number;
    dni: string;
}

export class AdministratorReponse extends BaseResponse<AdministratorBasicResponse>{}