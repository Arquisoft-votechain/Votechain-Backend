import { Module } from '@nestjs/common';
import { ClassroomController } from './controllers/classroom.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SchoolController } from './controllers/school.controller';
import { RoleController } from './controllers/role.controller';
import { MasterPoliticalPartyController } from './controllers/master-politica-party.controller';
import { ConfigModule } from '@nestjs/config';
import { PoliticalPartyParticipantController } from './controllers/political-party-participant.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register([
      {
        name: 'POLITICAL_PARTY_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.POLITICAL_SERVICE_HOSTNAME,
          port: +process.env.POLITICAL_SERVICE_PORT,
        },
      },
      {
        name: 'ELECTORAL_PROCESS_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.ELECTORAL_SERVICE_HOSTNAME,
          port: +process.env.ELECTORAL_SERVICE_PORT,
        },
      },
      {
        name: 'STUDENT_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.STUDENT_SERVICE_HOSTNAME,
          port: +process.env.STUDENT_SERVICE_PORT,
        },
      },
    ]),
   
  ],
  controllers: [
    ClassroomController,
    SchoolController,
    RoleController,
    MasterPoliticalPartyController,
    PoliticalPartyParticipantController
  ]
})
export class PoliticalPartyModule { }
