import { Test, TestingModule } from '@nestjs/testing';
import { PoliticalPartyParticipantService } from './political-party-participant.service';

describe('PoliticalPartyParticipantService', () => {
  let service: PoliticalPartyParticipantService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PoliticalPartyParticipantService],
    }).compile();

    service = module.get<PoliticalPartyParticipantService>(PoliticalPartyParticipantService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
