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
          host: process.env.STUDENT_SERVICE_HOSTNAME,
          port: +process.env.STUDENT_SERVICE_PORT,
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
    ]),
  ],
  controllers: [
    StudentController
  ]
})
export class StudentModule { }
