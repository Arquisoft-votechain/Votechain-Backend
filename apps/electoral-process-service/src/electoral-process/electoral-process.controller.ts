import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ElectoralProcessService } from './electoral-process.service';
import { RequestElectoralProcessDto } from './dto/request-electoral-process.dto';
import { ResponseElectoralProcessDto } from './dto/response-electoral-process.dto';
import { MessagePattern } from '@nestjs/microservices';

@Controller('electoral-process')
export class ElectoralProcessController {
  constructor(private readonly electoralProcessService: ElectoralProcessService) {}

  /*@Post()
  create(@Body() requestElectoralProcessDto: RequestElectoralProcessDto) {
    return this.electoralProcessService.create(requestElectoralProcessDto);
  }*/

  @MessagePattern({ cmd: 'createBySchoolId' })
  createBySchoolId(data: {schoolId: number, requestElectoralProcessDto: RequestElectoralProcessDto}){
    const {schoolId, requestElectoralProcessDto} = data;
    return this.electoralProcessService.createBySchoolId(schoolId, requestElectoralProcessDto);
  }

  /*@Get()
  findAll() {
    return this.electoralProcessService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.electoralProcessService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateElectoralProcessDto: ResponseElectoralProcessDto) {
    return this.electoralProcessService.update(+id, updateElectoralProcessDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.electoralProcessService.remove(+id);
  }*/
}
