import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ElectoralProcessService } from './electoral-process.service';
import { RequestElectoralProcessDto } from './dto/request-electoral-process.dto';
import { ResponseElectoralProcessDto } from './dto/response-electoral-process.dto';

@Controller('electoral-process')
export class ElectoralProcessController {
  constructor(private readonly electoralProcessService: ElectoralProcessService) {}

  @Post()
  create(@Body() createElectoralProcessDto: RequestElectoralProcessDto) {
    return this.electoralProcessService.create(createElectoralProcessDto);
  }

  @Get()
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
  }
}
