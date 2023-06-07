import { Controller, Delete, Get, Inject, Param, ParseIntPipe, Post } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('electoral-processes')
@Controller('electoral-processes')
export class ElectoralProcessController {
    constructor(@Inject('ELECTORAL_PROCESS_SERVICE') private client: ClientProxy,
    @Inject('POLITICAL_PARTY_SERVICE') private clientPoliticalPartyService: ClientProxy) { }

    @Post(':electoralId/students/:studentId')
    async assignStudentWithElectoralProcess(
        @Param('studentId', ParseIntPipe) studentId: number,
        @Param('electoralId', ParseIntPipe) electoralId: number) {
        return this.client.send({ cmd: 'assignStudentByIdAnElectoralProcessId' }, { studentId, electoralId });
    }

    @Delete(':electoralId/students/:studentId')
    async unassignStudentWithElectoralProcess(
        @Param('studentId', ParseIntPipe) studentId: number,
        @Param('electoralId', ParseIntPipe) electoralId: number) {
        return this.client.send({ cmd: 'unassignStudentByIdAnElectoralProcessId' }, { studentId, electoralId });
    }

    @Post(':electoralId/administrators/:adminId')
    async assignAdminWithElectoralProcess(
        @Param('adminId', ParseIntPipe) adminId: number,
        @Param('electoralId', ParseIntPipe) electoralId: number) {
        return this.client.send({ cmd: 'assignAdministratorByIdAnElectoralProcessId' }, { adminId, electoralId });
    }

    @Delete(':electoralId/administrators/:adminId')
    async unassignAdminWithElectoralProcess(
        @Param('adminId', ParseIntPipe) adminId: number,
        @Param('electoralId', ParseIntPipe) electoralId: number) {
        return this.client.send({ cmd: 'unassignAdministratorByIdAnElectoralProcessId' }, { adminId, electoralId });
    }

    @Get(':electoralId/students')
    async getStudentsByElectoralProcessId(@Param('electoralId', ParseIntPipe) electoralId: number){
        return this.client.send({cmd: 'getStudentsByElectoralProcessId' },electoralId);
    }

    @Get(':electoralId/administrators')
    async getAdministratorsByElectoralProcessId(@Param('electoralId', ParseIntPipe) electoralId: number){
        return this.client.send({cmd: 'getAdministratorsByElectoralProcessId' },electoralId);
    }

    @Get(':electoralId/political-party-participants')
    async getPoliticalPartyParticipantsByElectoralId(@Param('electoralId', ParseIntPipe) electoralId: number){
        return this.clientPoliticalPartyService.send({cmd: 'getPoliticalPartyParticipantsByElectoralId' },electoralId);
    }
}