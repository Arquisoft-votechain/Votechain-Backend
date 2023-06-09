import { Injectable } from "@nestjs/common";
import { Client, ClientProxy, Transport } from "@nestjs/microservices";
import { StudentReponse } from "./student.response";
import { lastValueFrom, map } from "rxjs";

@Injectable()
export class StudentClient {
  

  @Client({
    transport: Transport.TCP,
    options: {
      host: process.env.student_hostname,
      port: 4204, //Por alguna razon no carga el port desde .env
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

  async findCountVotesByPoliticalPartyParticipantId(id: number) {
    const response = await lastValueFrom(this.clientProxy.send({cmd: 'findCountVotesByPoliticalPartyParticipantId'},id)
      .pipe(
        map(response => response as {votes:number})
      )
    );
    return response;
  }
}