import { Test, TestingModule } from '@nestjs/testing';
import { CustomerWalletController } from './customer-wallet.controller';
import { CustomerWalletService } from './customer-wallet.service';

describe('CustomerWalletController', () => {
  let controller: CustomerWalletController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerWalletController],
      providers: [CustomerWalletService],
    }).compile();

    controller = module.get<CustomerWalletController>(CustomerWalletController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
