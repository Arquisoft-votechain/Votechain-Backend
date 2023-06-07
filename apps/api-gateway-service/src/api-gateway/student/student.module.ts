import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { StudentController } from './controllers/student.controller';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register([
      {
        name: 'STUDENT_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.HOSTNAME,
          port: +process.env.student_service_port,
        },
      },
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
    StudentController
  ]
})
export class StudentModule { }
