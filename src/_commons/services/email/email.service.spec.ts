import { Test, TestingModule } from '@nestjs/testing';
import { Email } from './email.service';

describe('EmailService', () => {
  let service: Email;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Email],
    }).compile();

    service = module.get<Email>(Email);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
