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
          host: process.env.HOSTNAME,
          port: +process.env.political_party_service_port,
        },
      },
    ]),
    ClientsModule.register([
      {
        name: 'ELECTORAL_PROCESS_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.HOSTNAME,
          port: +process.env.electoral_process_service_port,
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
