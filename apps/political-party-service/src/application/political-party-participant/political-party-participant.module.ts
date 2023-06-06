import { Module } from '@nestjs/common';
import { PoliticalPartyParticipantController } from 'src/infrastructure/index.infrastructure';
import { PoliticalPartyParticipantServiceImpl } from '../index.application';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PoliticalPartyParticipant } from 'src/domain/index.domain';


@Module({
  controllers: [PoliticalPartyParticipantController],
  providers: [PoliticalPartyParticipantServiceImpl],
  imports:[
    TypeOrmModule.forFeature([PoliticalPartyParticipant])
  ]
})
export class PoliticalPartyParticipantModule {}