import { BaseResponse } from "src/utils/base.response";

export class ElectoralProcessDto{
    id: number;
    title:string;
    start_date:Date;
    end_date:Date;
    status: number;
    smartContractAddress: string;
}

export class ElectoralProcessResponse extends BaseResponse<ElectoralProcessDto>{
    
}