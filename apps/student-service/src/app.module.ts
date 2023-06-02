import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './student/student.module';
import { VoteModule } from './vote/vote.module';

@Module({
  imports: [StudentModule, VoteModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
