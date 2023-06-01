import { Module } from '@nestjs/common';
import { PoliticalPartyParticipantService } from './political-party-participant.service';
import { PoliticalPartyParticipantController } from './political-party-participant.controller';

@Module({
  controllers: [PoliticalPartyParticipantController],
  providers: [PoliticalPartyParticipantService]
})
export class PoliticalPartyParticipantModule {}
