import { Test, TestingModule } from '@nestjs/testing';
import { MasterPoliticalPartyService } from './master-political-party.service';

describe('MasterPoliticalPartyService', () => {
  let service: MasterPoliticalPartyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MasterPoliticalPartyService],
    }).compile();

    service = module.get<MasterPoliticalPartyService>(MasterPoliticalPartyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
