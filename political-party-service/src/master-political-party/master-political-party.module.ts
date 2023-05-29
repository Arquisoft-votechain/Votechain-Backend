import { Module } from '@nestjs/common';
import { MasterPoliticalPartyService } from './master-political-party.service';
import { MasterPoliticalPartyController } from './master-political-party.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MasterPoliticalParty } from './entities/master-political-party.entity';

@Module({
  controllers: [MasterPoliticalPartyController],
  providers: [MasterPoliticalPartyService],
  imports:[
    TypeOrmModule.forFeature([MasterPoliticalParty]),
  ]
})
export class MasterPoliticalPartyModule {}
