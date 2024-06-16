import { PartialType } from '@nestjs/swagger';
import { CreateVoucherCustomerDto } from './create-voucher-customer.dto';

export class UpdateVoucherCustomerDto extends PartialType(CreateVoucherCustomerDto) {}
