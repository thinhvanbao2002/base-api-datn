import { PartialType } from '@nestjs/swagger';
import { CreateCustomerInfoDto } from './create-customer-info.dto';

export class UpdateCustomerInfoDto extends PartialType(CreateCustomerInfoDto) {}
