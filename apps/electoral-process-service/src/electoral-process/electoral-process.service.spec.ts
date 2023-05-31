import { Test, TestingModule } from '@nestjs/testing';
import { ElectoralProcessService } from './electoral-process.service';

describe('ElectoralProcessService', () => {
  let service: ElectoralProcessService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ElectoralProcessService],
    }).compile();

    service = module.get<ElectoralProcessService>(ElectoralProcessService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
