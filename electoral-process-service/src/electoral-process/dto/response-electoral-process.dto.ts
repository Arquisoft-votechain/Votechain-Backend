import { PartialType } from '@nestjs/mapped-types';
import { RequestElectoralProcessDto } from './request-electoral-process.dto';

export class ResponseElectoralProcessDto extends PartialType(RequestElectoralProcessDto) {}
