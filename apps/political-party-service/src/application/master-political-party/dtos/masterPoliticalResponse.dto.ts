import { PartialType } from "@nestjs/swagger";
import { MasterPoliticalRequest } from "./masterPoliticalRequest.dto";
import { BaseResponse } from "src/utils/base.response";

export class MasterPoliticalBasicResponse extends PartialType(MasterPoliticalRequest){}

export class MasterPoliticalResponse extends BaseResponse<MasterPoliticalBasicResponse>{}