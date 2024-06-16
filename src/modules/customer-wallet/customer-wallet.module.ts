import { Module } from '@nestjs/common';
import { CustomerWalletService } from './customer-wallet.service';
import { CustomerWalletController } from './customer-wallet.controller';

@Module({
  controllers: [CustomerWalletController],
  providers: [CustomerWalletService],
})
export class CustomerWalletModule {}
