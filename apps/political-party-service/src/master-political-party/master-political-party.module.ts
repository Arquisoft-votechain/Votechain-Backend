import { Module } from '@nestjs/common';
import { MasterPoliticalPartyService } from './master-political-party.service';
import { MasterPoliticalPartyController } from './master-political-party.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MasterPoliticalParty } from './entities/master-political-party.entity';
import { PoliticalPartyParticipant } from 'src/political-party-participant/entities/political-party-participant.entity';

@Module({
  controllers: [MasterPoliticalPartyController],
  providers: [MasterPoliticalPartyService],
  imports:[
    TypeOrmModule.forFeature([MasterPoliticalParty]),
    TypeOrmModule.forFeature([PoliticalPartyParticipant]),
  ]
})
export class MasterPoliticalPartyModule {}
