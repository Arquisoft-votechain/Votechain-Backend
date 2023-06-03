import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleModule } from './role/role.module';
import { SchoolModule } from './school/school.module';
import { ClassroomModule } from './classroom/classroom.module';
import { MasterPoliticalPartyModule } from './master-political-party/master-political-party.module';
import { PoliticalPartyParticipantModule } from './political-party-participant/political-party-participant.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true
    }),
    RoleModule,
    SchoolModule,
    ClassroomModule,
    MasterPoliticalPartyModule,
    PoliticalPartyParticipantModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}