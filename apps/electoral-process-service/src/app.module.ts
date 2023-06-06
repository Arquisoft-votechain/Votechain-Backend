import { Module } from '@nestjs/common';
import { ElectoralProcessModule } from './application/electoral-process/electoralProcess.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './infrastructure/database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    ElectoralProcessModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
