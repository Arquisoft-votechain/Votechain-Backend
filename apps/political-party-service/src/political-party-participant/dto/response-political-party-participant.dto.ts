import { PartialType } from '@nestjs/swagger';
import { RequestPoliticalPartyParticipantDto } from './request-political-party-participant.dto';

export class ResponsePoliticalPartyParticipantDto extends PartialType(RequestPoliticalPartyParticipantDto) {}
