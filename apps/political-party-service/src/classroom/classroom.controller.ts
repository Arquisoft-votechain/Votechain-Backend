import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ClassroomService } from './classroom.service';
import { RequestClassroomDto } from './dto/request-classroom.dto';
import { ResponseClassroomDto } from './dto/response-classroom.dto';
import { ApiTags } from '@nestjs/swagger';
import { MessagePattern } from '@nestjs/microservices';

//@ApiTags('classroom')
@Controller('classroom')
export class ClassroomController {
  constructor(private readonly classroomService: ClassroomService) {}

  /*@Post()
  create(@Body() createClassroomDto: RequestClassroomDto) {
    return this.classroomService.create(createClassroomDto);
  }*/

  //@Get()
  @MessagePattern({ cmd: 'findAllClassrooms' })
  findAllClassrooms(): Promise<ResponseClassroomDto[]> {
    return this.classroomService.findAll();
  }

  //@Get(':id')
  @MessagePattern({ cmd: 'findOneClassroom' })
  findOneClassroom(id: number): Promise<ResponseClassroomDto> {
    return this.classroomService.findOne(id);
  }

  //

  /*@Patch(':id')
  update(@Param('id') id: string, @Body() updateClassroomDto: ResponseClassroomDto) {
    return this.classroomService.update(+id, updateClassroomDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.classroomService.remove(+id);
  }*/
}
