import { Module } from '@nestjs/common';
import { AdministratorModule } from './application/administrator/administrator.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './infrastructure/database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    AdministratorModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
