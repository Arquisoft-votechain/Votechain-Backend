import { Module } from '@nestjs/common';
import { ElectoralProcessService } from './electoral-process.service';
import { ElectoralProcessController } from './electoral-process.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ElectoralProcess } from './entities/electoral-process.entity';
import { PoliticalPartyClient } from './client/school/school.client';

@Module({
  controllers: [ElectoralProcessController],
  providers: [PoliticalPartyClient,ElectoralProcessService],
  imports:[TypeOrmModule.forFeature([ElectoralProcess])]
})
export class ElectoralProcessModule {}
