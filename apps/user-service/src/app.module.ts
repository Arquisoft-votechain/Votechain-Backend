import { Module } from '@nestjs/common';
import { UserModule } from './application/user/user.module';
import { NotificationModule } from './application/notification/notification.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from './infrastructure/database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    UserModule, NotificationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
