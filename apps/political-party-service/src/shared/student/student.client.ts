import { Injectable } from "@nestjs/common";
import { Client, ClientProxy, Transport } from "@nestjs/microservices";
import { StudentBasicResponse, StudentReponse } from "./student.response";
import { lastValueFrom, map } from "rxjs";
import { config } from 'dotenv';

config()
@Injectable()
export class StudentClient {


  @Client({
    transport: Transport.TCP,
    options: {
      host: process.env.STUDENT_SERVICE_HOSTNAME,
      port: +process.env.STUDENT_SERVICE_PORT, //Por alguna razon no carga el port desde .env
    },
  })
  private readonly clientProxy: ClientProxy;

  async getStudentById(id: number): Promise<StudentReponse> {

    const response = await lastValueFrom(this.clientProxy.send({ cmd: 'findOneStudent' }, id)
      .pipe(
        map(response => response as StudentReponse)
      ));

    return response;
  }

  async getStudentsByClassroomId(classroomId: number): Promise<StudentBasicResponse[]> {

    const response = await lastValueFrom(this.clientProxy.send({ cmd: 'findStudentsByClassroomId' }, classroomId)
      .pipe(
        map(response => response as StudentBasicResponse[])
      ));

    return response;
  }

  async updateStudentById(studenRequest: StudentBasicResponse, id: number): Promise<StudentReponse> {
    console.log(studenRequest);
    const response = await lastValueFrom(this.clientProxy.send({ cmd: 'updateStudent' }, {id,studenRequest})
      .pipe(
        map(response => response as StudentReponse)
      ));

    return response;
  }
}