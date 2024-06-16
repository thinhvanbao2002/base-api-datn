import { Module } from '@nestjs/common';
import { VoucherCustomerService } from './voucher-customer.service';
import { VoucherCustomerController } from './voucher-customer.controller';

@Module({
  controllers: [VoucherCustomerController],
  providers: [VoucherCustomerService],
})
export class VoucherCustomerModule {}
