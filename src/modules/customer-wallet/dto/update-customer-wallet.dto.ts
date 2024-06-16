import { PartialType } from '@nestjs/swagger';
import { CreateCustomerWalletDto } from './create-customer-wallet.dto';

export class UpdateCustomerWalletDto extends PartialType(CreateCustomerWalletDto) {}
