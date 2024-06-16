import { PartialType } from '@nestjs/swagger';
import { CreateCustomerWalletHistoryDto } from './create-customer-wallet-history.dto';

export class UpdateCustomerWalletHistoryDto extends PartialType(CreateCustomerWalletHistoryDto) {}
