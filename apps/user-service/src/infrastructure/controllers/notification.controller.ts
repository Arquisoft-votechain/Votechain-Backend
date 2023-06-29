import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateNotificationDto, NotificationServiceImpl, UpdateNotificationDto } from 'src/application/index.application';


@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationServiceImpl) {}

  @Post()
  create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationService.create(createNotificationDto);
  }

  @Get()
  findAll() {
    return this.notificationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notificationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNotificationDto: UpdateNotificationDto) {
    return this.notificationService.update(+id, updateNotificationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notificationService.remove(+id);
  }
}
