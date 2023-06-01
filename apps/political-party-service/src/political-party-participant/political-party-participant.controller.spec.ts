import { Test, TestingModule } from '@nestjs/testing';
import { PoliticalPartyParticipantController } from './political-party-participant.controller';
import { PoliticalPartyParticipantService } from './political-party-participant.service';

describe('PoliticalPartyParticipantController', () => {
  let controller: PoliticalPartyParticipantController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PoliticalPartyParticipantController],
      providers: [PoliticalPartyParticipantService],
    }).compile();

    controller = module.get<PoliticalPartyParticipantController>(PoliticalPartyParticipantController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
