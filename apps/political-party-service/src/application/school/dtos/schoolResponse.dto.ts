import { PartialType } from '@nestjs/mapped-types';
import { SchoolRequest } from './schoolRequest.dto';
import { BaseResponse } from 'src/utils/base.response';


export class SchoolBasicResponse extends PartialType(SchoolRequest) {}

export class SchoolResponse extends BaseResponse<SchoolBasicResponse> {}