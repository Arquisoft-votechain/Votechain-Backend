import { BaseResponse } from "src/utils/base.response";

export class SchoolDto {

    id: number;
    
    name: string;
}

export class SchoolReponse extends BaseResponse<SchoolDto>{}