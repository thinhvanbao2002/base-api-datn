import { Module } from '@nestjs/common';
import { CustomerWalletHistoryService } from './customer-wallet-history.service';
import { CustomerWalletHistoryController } from './customer-wallet-history.controller';

@Module({
  controllers: [CustomerWalletHistoryController],
  providers: [CustomerWalletHistoryService],
})
export class CustomerWalletHistoryModule {}
