import { Injectable } from '@nestjs/common';
import { CreateVoucherCustomerDto } from './dto/create-voucher-customer.dto';
import { UpdateVoucherCustomerDto } from './dto/update-voucher-customer.dto';

@Injectable()
export class VoucherCustomerService {
  create(createVoucherCustomerDto: CreateVoucherCustomerDto) {
    return 'This action adds a new voucherCustomer';
  }

  findAll() {
    return `This action returns all voucherCustomer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} voucherCustomer`;
  }

  update(id: number, updateVoucherCustomerDto: UpdateVoucherCustomerDto) {
    return `This action updates a #${id} voucherCustomer`;
  }

  remove(id: number) {
    return `This action removes a #${id} voucherCustomer`;
  }
}
