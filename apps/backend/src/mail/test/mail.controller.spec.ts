import { Test, TestingModule } from '@nestjs/testing';
import { MailService } from '../service';

describe('MailController', () => {

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MailService],
    }).compile();

  });

  it('should be defined', () => {
  });
});
