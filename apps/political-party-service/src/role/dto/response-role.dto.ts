import { PartialType } from '@nestjs/mapped-types';
import { RequestRoleDto } from './request-role.dto';

export class ResponseRoleDto extends PartialType(RequestRoleDto) {}
