import { Module } from '@nestjs/common';
import { ClassroomController, MasterPoliticalPartyController } from 'src/infrastructure/index.infrastructure';
import { MasterPoliticalPartyServiceImpl } from '../index.application';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MasterPoliticalParty, PoliticalPartyParticipant } from 'src/domain/index.domain';
import { ElectoralProcessClient } from '../../shared/electoral-process/electoralProcess.client';


@Module({
  controllers: [MasterPoliticalPartyController],
  providers: [MasterPoliticalPartyServiceImpl,ElectoralProcessClient],
  imports:[
    TypeOrmModule.forFeature([MasterPoliticalParty]),
    TypeOrmModule.forFeature([PoliticalPartyParticipant])
  ]
})
export class MasterPoliticalPartyModule {}