import { BaseResponse } from "src/utils/base.response";

export class SchoolBasicResponse {
    id: number;
    name: string;
}

export class SchoolReponse extends BaseResponse<SchoolBasicResponse>{}