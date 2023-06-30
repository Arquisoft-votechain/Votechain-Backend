import { Module } from '@nestjs/common';
import { StudentModule } from './application/student/student.module';
import { VoteModule } from './application/vote/vote.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from './infrastructure/database/database.module';
import { Web3Module } from './application/web3/web3.module';

@Module({
  imports: [
    ConfigModule.forRoot(
      {isGlobal: true}
    ),
    DatabaseModule,
    StudentModule, VoteModule, Web3Module],
  controllers: [],
  providers: [],
})
export class AppModule {}
