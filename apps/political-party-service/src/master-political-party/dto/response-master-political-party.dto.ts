import { PartialType } from '@nestjs/swagger';
import { RequestMasterPoliticalPartyDto } from './request-master-political-party.dto';

export class ResponseMasterPoliticalPartyDto extends PartialType(RequestMasterPoliticalPartyDto) {}
