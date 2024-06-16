import { Test, TestingModule } from '@nestjs/testing';
import { VoucherCustomerController } from './voucher-customer.controller';
import { VoucherCustomerService } from './voucher-customer.service';

describe('VoucherCustomerController', () => {
  let controller: VoucherCustomerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VoucherCustomerController],
      providers: [VoucherCustomerService],
    }).compile();

    controller = module.get<VoucherCustomerController>(VoucherCustomerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
