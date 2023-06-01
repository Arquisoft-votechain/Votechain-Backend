import { Controller, Get, Inject, Param, ParseIntPipe, UseFilters } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/util/http-exception.filter';

@ApiTags('classrooms')
@Controller('classrooms')
@UseFilters(new HttpExceptionFilter())
export class ClassroomController {
    constructor(@Inject('POLITICAL_PARTY_SERVICE') private client: ClientProxy) { }

    @Get()
    findAll() {
        return this.client.send({ cmd: 'findAllClassrooms' }, '');
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.client.send({ cmd: 'findOneClassroom' }, id);
    }
}
