import { Module } from '@nestjs/common';
import { VoteServiceImpl } from './services/voteImpl.service';
import { VoteController } from '../../infrastructure/controllers/vote.controller';
import { PoliticalPartyParticipantClient } from 'src/shared/political-party-participant/political-party-participant.client';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student, Vote } from 'src/domain/index.domain';
import { StudentServiceImpl } from '../index.application';

@Module({
  controllers: [VoteController],
  providers: [VoteServiceImpl, PoliticalPartyParticipantClient, StudentServiceImpl],
  imports:[
    TypeOrmModule.forFeature([Student]),
    TypeOrmModule.forFeature([Vote]),
  ]
})
export class VoteModule {}
