import { ApiProperty, PartialType } from "@nestjs/swagger";
import { ClassroomRequest } from "./clasroomRequest.dto";
import { BaseResponse } from "src/utils/base.response";
import { Exclude, Expose } from "class-transformer";
import { School } from "src/domain/index.domain";

export class ClassroomBasicResponse extends PartialType(ClassroomRequest){

    @Expose()
    school_id: number;

    @Exclude()
    school: School
}

export class ClassroomResponse extends BaseResponse<ClassroomBasicResponse> {}

