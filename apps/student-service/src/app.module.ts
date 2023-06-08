import { Module } from '@nestjs/common';
import { StudentModule } from './application/student/student.module';
import { VoteModule } from './application/vote/vote.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from './infrastructure/database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    StudentModule, VoteModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
