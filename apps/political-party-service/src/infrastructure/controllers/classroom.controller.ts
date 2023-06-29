
import { ApiTags } from '@nestjs/swagger';
import { MessagePattern } from '@nestjs/microservices';
import { Controller } from '@nestjs/common';
import { ClassroomBasicResponse, ClassroomResponse, ClassroomServiceImpl } from 'src/application/index.application';

//@ApiTags('classroom')
@Controller('classrooms')
export class ClassroomController {
  constructor(private readonly classroomService: ClassroomServiceImpl) {}


  @MessagePattern({ cmd: 'findAllClassrooms' })
  async findAllClassrooms(): Promise<ClassroomBasicResponse[]> {
    return await this.classroomService.getAllClassrooms();
  }

  @MessagePattern({ cmd: 'findOneClassroom' })
  async findOneClassroom(id: number): Promise<ClassroomResponse> {
    return await this.classroomService.getClassroomById(id);
  }


}
