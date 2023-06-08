import { BaseResponse } from "src/utils/base.response";

export class ElectoralProcessBasicResponse {
    id: number;
    title:string;
    start_date:Date;
    end_date:Date;
    status: number;
}

export class ElectoralProcessReponse extends BaseResponse<ElectoralProcessBasicResponse>{}