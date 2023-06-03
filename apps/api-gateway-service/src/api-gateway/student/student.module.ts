import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { StudentController } from './controllers/student.controller';


@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'STUDENT_SERVICE',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 4205,
        },
      },
    ]),
  ],
  controllers: [
    StudentController
  ]
})
export class StudentModule { }
