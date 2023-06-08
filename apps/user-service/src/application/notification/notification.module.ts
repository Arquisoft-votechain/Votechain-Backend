import { Module } from '@nestjs/common';
import { NotificationServiceImpl } from './services/notificationImpl.service';
import { NotificationController } from '../../infrastructure/controllers/notification.controller';

@Module({
  controllers: [NotificationController],
  providers: [NotificationServiceImpl]
})
export class NotificationModule {}
