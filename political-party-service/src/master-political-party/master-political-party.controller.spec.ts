import { Test, TestingModule } from '@nestjs/testing';
import { MasterPoliticalPartyController } from './master-political-party.controller';
import { MasterPoliticalPartyService } from './master-political-party.service';

describe('MasterPoliticalPartyController', () => {
  let controller: MasterPoliticalPartyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MasterPoliticalPartyController],
      providers: [MasterPoliticalPartyService],
    }).compile();

    controller = module.get<MasterPoliticalPartyController>(MasterPoliticalPartyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
