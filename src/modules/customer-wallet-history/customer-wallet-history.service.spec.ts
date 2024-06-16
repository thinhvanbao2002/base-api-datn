import { Test, TestingModule } from '@nestjs/testing';
import { CustomerWalletHistoryService } from './customer-wallet-history.service';

describe('CustomerWalletHistoryService', () => {
  let service: CustomerWalletHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomerWalletHistoryService],
    }).compile();

    service = module.get<CustomerWalletHistoryService>(CustomerWalletHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
