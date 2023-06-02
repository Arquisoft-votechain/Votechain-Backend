import { Body, Controller, Delete, Get, Inject, NotFoundException, Param, ParseIntPipe, Patch, Post, UseFilters } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/util/http-exception.filter';
import { RequestSchoolDto } from '../models/school.dto';
import { RequestClassroomDto } from '../models/classroom.dto';
import { RequestMasterPoliticalPartyDto } from '../models/master-political-party.dto';
import { RequestElectoralProcessDto } from '../models/electoral-process.dto';
import { catchError } from 'rxjs';
import { error } from 'console';

@ApiTags('schools')
@Controller('schools')
export class SchoolController {
    constructor(
        @Inject('POLITICAL_PARTY_SERVICE') private clientPoliticalPartyService: ClientProxy,
        @Inject('ELECTORAL_PROCESS_SERVICE') private clientElectoralProcessService: ClientProxy,
    ) { }

    @Get()
    findAll() {
        return this.clientPoliticalPartyService.send({ cmd: 'findAllSchools' }, '');
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.clientPoliticalPartyService.send({ cmd: 'findOneSchool' }, id);
    }

    @Get(':id/classrooms')
    findAllClassroomsBySchoolId(@Param('id', ParseIntPipe) id: number) {
        return this.clientPoliticalPartyService.send({ cmd: 'findAllClassroomsBySchoolId' }, id);
    }

    @Post()
    createSchool(@Body() requestSchoolDto: RequestSchoolDto) {
        return this.clientPoliticalPartyService.send({ cmd: 'createSchool' }, requestSchoolDto);
    }

    @Post(':id/classrooms')
    createClassroomBySchoolId(@Param('id', ParseIntPipe) id: number, @Body() requestClassroomDto: RequestClassroomDto) {
        return this.clientPoliticalPartyService.send({ cmd: 'createClassroomBySchoolId' }, { id, requestClassroomDto });
        //return this.schoolService.createClassroomBySchoolId(id, requestClassroomDto);
    }

    @Post(':id/master-political-parties')
    createMasterPoliticalPartyBySchoolId(@Param('id', ParseIntPipe) id: number, @Body() requestMasterPoliticalPartyDto: RequestMasterPoliticalPartyDto) {
        return this.clientPoliticalPartyService.send({ cmd: 'createMasterPoliticalPartyBySchoolId' }, { id, requestMasterPoliticalPartyDto });
        //return this.schoolService.createMasterPoliticalPartyBySchoolId(id, requestMasterPoliticalPartyDto);
    }

    @Get(':id/master-political-parties')
    findAllMasterPoliticalPartiesBySchoolId(@Param('id', ParseIntPipe) id: number) {
        return this.clientPoliticalPartyService.send({ cmd: 'findAllMasterPoliticalPartiesBySchoolId' }, id);
    }

    @Patch(':id')
    update(@Param('id') id: number, @Body() requestSchoolDto: RequestSchoolDto) {
        return this.clientPoliticalPartyService.send({ cmd: 'updateSchool' }, { id, requestSchoolDto });
    }

    @Patch(':schoolId/classrooms/:id')
    updateClassroomBySchoolIdAndId(@Param('schoolId', ParseIntPipe) schoolId: number,
        @Param('id', ParseIntPipe) id: number,
        @Body() requestClassroomDto: RequestClassroomDto) {
        return this.clientPoliticalPartyService.send({ cmd: 'updateClassroomBySchoolIdAndId' }, { schoolId, id, requestClassroomDto });

    }

    @Patch(':schoolId/master-political-parties/:id')
    updateMasterPPBySchoolIdAndId(@Param('schoolId', ParseIntPipe) schoolId: number,
        @Param('id', ParseIntPipe) id: number,
        @Body() requestMasterPoliticalPartyDto: RequestMasterPoliticalPartyDto) {
        return this.clientPoliticalPartyService.send({ cmd: 'updateMasterPPBySchoolIdAndId' }, { schoolId, id, requestMasterPoliticalPartyDto });
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.clientPoliticalPartyService.send({ cmd: 'removeSchool' }, id)
    }

    @Delete(':schoolId/classrooms/:id')
    deleteClassroomByIdAndSchoolId(
        @Param('schoolId', ParseIntPipe) schoolId: number,
        @Param('id', ParseIntPipe) id: number) {
        return this.clientPoliticalPartyService.send({ cmd: 'deleteClassroomBySchoolIdAndId' }, { schoolId, id })
    }

    @Delete(':schoolId/master-political-parties/:id')
    deleteMasterPPBySchoolIdAndId(
        @Param('schoolId', ParseIntPipe) schoolId: number,
        @Param('id', ParseIntPipe) id: number) {
        return this.clientPoliticalPartyService.send({ cmd: 'deleteMasterPPBySchoolIdAndId' }, { schoolId, id })
    }



    /////////////////////////ELECTORAL PROCESS
    @Post(':schoolId/electoral-processes')
    createBySchoolId(
        @Param('schoolId', ParseIntPipe) schoolId: number,
        @Body() requestElectoralProcessDto: RequestElectoralProcessDto) {
        return this.clientElectoralProcessService.send({ cmd: 'createElectoralProcessBySchoolId' }, { schoolId, requestElectoralProcessDto });

    }

    @Get(':schoolId/electoral-processes')
    findAllElectoralProcessesBySchoolId(
        @Param('schoolId', ParseIntPipe) schoolId: number) {
        return this.clientElectoralProcessService.send({ cmd: 'findAllElectoralProcessesBySchoolId' }, schoolId );
    }

    @Get(':schoolId/electoral-processes/:id')
    findOneElectoralProcessBySchoolIdAndId(
        @Param('schoolId', ParseIntPipe) schoolId: number,
        @Param('id', ParseIntPipe) id: number,
        ) {
        return this.clientElectoralProcessService.send({ cmd: 'findOneElectoralProcessBySchoolIdAndId' }, { schoolId, id });
    }

    @Patch(':schoolId/electoral-processes/:id')
    updateElectoralProcessBySchoolIdAndId(
        @Param('schoolId', ParseIntPipe) schoolId: number,
        @Param('id', ParseIntPipe) id: number,
        @Body() requestElectoralProcessDto: RequestElectoralProcessDto
        ) {
        return this.clientElectoralProcessService.send({ cmd: 'updateElectoralProcessBySchoolIdAndId' }, { schoolId, id, requestElectoralProcessDto });
    }

    @Delete(':schoolId/electoral-processes/:id')
    removeElectoralProcessBySchoolIdAndId(
        @Param('schoolId', ParseIntPipe) schoolId: number,
        @Param('id', ParseIntPipe) id: number,
        ) {
        return this.clientElectoralProcessService.send({ cmd: 'removeElectoralProcessBySchoolIdAndId' }, { schoolId, id });
    }

}