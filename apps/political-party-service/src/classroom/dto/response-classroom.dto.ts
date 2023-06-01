import { PartialType } from '@nestjs/mapped-types';
import { RequestClassroomDto } from './request-classroom.dto';

export class ResponseClassroomDto extends PartialType(RequestClassroomDto) {

    schoolId: number;
}
