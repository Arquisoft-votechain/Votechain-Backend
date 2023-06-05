import { Module } from '@nestjs/common';
import { ClassroomController, MasterPoliticalPartyController } from 'src/infrastructure/index.infrastructure';
import { MasterPoliticalPartyServiceImpl } from '../index.application';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MasterPoliticalParty, PoliticalPartyParticipant } from 'src/domain/index.domain';


@Module({
  controllers: [MasterPoliticalPartyController],
  providers: [MasterPoliticalPartyServiceImpl],
  imports:[
    TypeOrmModule.forFeature([MasterPoliticalParty]),
    TypeOrmModule.forFeature([PoliticalPartyParticipant])
  ]
})
export class MasterPoliticalPartyModule {}