import { PartialType } from "@nestjs/mapped-types";
import { ElectoralProcessRequest } from "./electoralProcessRequest.dto";
import { BaseResponse } from "src/utils/base.response";

export class ElectoralProcessBasicResponse extends PartialType(ElectoralProcessRequest){
    id:number;
}

export class ElectoralProcessResponse extends BaseResponse<ElectoralProcessBasicResponse>{}