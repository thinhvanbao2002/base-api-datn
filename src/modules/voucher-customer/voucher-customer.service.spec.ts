import { Test, TestingModule } from '@nestjs/testing';
import { VoucherCustomerService } from './voucher-customer.service';

describe('VoucherCustomerService', () => {
  let service: VoucherCustomerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VoucherCustomerService],
    }).compile();

    service = module.get<VoucherCustomerService>(VoucherCustomerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
