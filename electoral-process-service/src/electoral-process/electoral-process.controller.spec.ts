import { Test, TestingModule } from '@nestjs/testing';
import { ElectoralProcessController } from './electoral-process.controller';
import { ElectoralProcessService } from './electoral-process.service';

describe('ElectoralProcessController', () => {
  let controller: ElectoralProcessController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ElectoralProcessController],
      providers: [ElectoralProcessService],
    }).compile();

    controller = module.get<ElectoralProcessController>(ElectoralProcessController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
