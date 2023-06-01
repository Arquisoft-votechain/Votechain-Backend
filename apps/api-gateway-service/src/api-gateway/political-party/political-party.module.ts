import { Module } from '@nestjs/common';
import { ClassroomController } from './controllers/classroom.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SchoolController } from './controllers/school.controller';
import { RoleController } from './controllers/role.controller';
import { MasterPoliticalPartyController } from './controllers/master-politica-party.controller';


@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'POLITICAL_PARTY_SERVICE',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 4201,
        },
      },
    ]),
    ClientsModule.register([
      {
        name: 'ELECTORAL_PROCESS_SERVICE',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 4202,
        },
      },
    ]),
  ],
  controllers: [
    ClassroomController,
    SchoolController,
    RoleController,
    MasterPoliticalPartyController
  ]
})
export class PoliticalPartyModule { }
