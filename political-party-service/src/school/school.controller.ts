import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { SchoolService } from './school.service';
import { RequestSchoolDto } from './dto/request-school.dto';
import { ResponseSchoolDto } from './dto/response-school.dto';

@Controller('school')
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}

  @Post()
  create(@Body() requestSchoolDto: RequestSchoolDto) {
    return this.schoolService.create(requestSchoolDto);
  }

  @Get()
  findAll() {
    return this.schoolService.findAll();
  }

  @Get(':id')
  findOne(@Param('id',ParseIntPipe) id: number) {
    return this.schoolService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() requestSchoolDto: RequestSchoolDto) {
    return this.schoolService.update(id, requestSchoolDto);
  }

  @Delete(':id')
  remove(@Param('id',ParseIntPipe) id: number) {
    return this.schoolService.remove(id);
  }
}
