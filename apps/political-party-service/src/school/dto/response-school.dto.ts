import { PartialType } from '@nestjs/mapped-types';
import { RequestSchoolDto } from './request-school.dto';

export class ResponseSchoolDto extends PartialType(RequestSchoolDto) {}
