import { Module } from '@nestjs/common';
import { DatabaseModule } from './infrastructure/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { ClassroomModule } from './application/classroom/classroom.module';
import { MasterPoliticalPartyModule } from './application/master-political-party/master-political-party.module';
import { PoliticalPartyParticipantModule } from './application/political-party-participant/political-party-participant.module';
import { SchoolModule } from './application/school/school.module';
import { RoleModule } from './application/role/role.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    
    ClassroomModule,
    MasterPoliticalPartyModule,
    PoliticalPartyParticipantModule,
    SchoolModule,
    RoleModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
