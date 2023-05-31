import { Module } from '@nestjs/common';
import { ElectoralProcessService } from './electoral-process.service';
import { ElectoralProcessController } from './electoral-process.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ElectoralProcess } from './entities/electoral-process.entity';

@Module({
  controllers: [ElectoralProcessController],
  providers: [ElectoralProcessService],
  imports:[TypeOrmModule.forFeature([ElectoralProcess])]
})
export class ElectoralProcessModule {}
