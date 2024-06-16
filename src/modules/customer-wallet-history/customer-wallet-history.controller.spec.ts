import { Test, TestingModule } from '@nestjs/testing';
import { CustomerWalletHistoryController } from './customer-wallet-history.controller';
import { CustomerWalletHistoryService } from './customer-wallet-history.service';

describe('CustomerWalletHistoryController', () => {
  let controller: CustomerWalletHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerWalletHistoryController],
      providers: [CustomerWalletHistoryService],
    }).compile();

    controller = module.get<CustomerWalletHistoryController>(CustomerWalletHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
