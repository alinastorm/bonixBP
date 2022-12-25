import { Test, TestingModule } from '@nestjs/testing';
import { ЭлектроннаяПочта } from './email.service';

describe('EmailService', () => {
  let service: ЭлектроннаяПочта;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ЭлектроннаяПочта],
    }).compile();

    service = module.get<ЭлектроннаяПочта>(ЭлектроннаяПочта);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
