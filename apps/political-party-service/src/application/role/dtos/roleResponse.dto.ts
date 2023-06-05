import { PartialType } from "@nestjs/swagger";
import { RoleRequest } from "./roleRequest.dto";
import { BaseResponse } from "src/utils/base.response";

export class RoleBasicResponse extends PartialType(RoleRequest){}

export class RoleResponse extends BaseResponse<RoleBasicResponse>{}