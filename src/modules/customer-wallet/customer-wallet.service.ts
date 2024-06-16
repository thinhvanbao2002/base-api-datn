import { Injectable } from '@nestjs/common';
import { CreateCustomerWalletDto } from './dto/create-customer-wallet.dto';
import { UpdateCustomerWalletDto } from './dto/update-customer-wallet.dto';

@Injectable()
export class CustomerWalletService {
  create(createCustomerWalletDto: CreateCustomerWalletDto) {
    return 'This action adds a new customerWallet';
  }

  findAll() {
    return `This action returns all customerWallet`;
  }

  findOne(id: number) {
    return `This action returns a #${id} customerWallet`;
  }

  update(id: number, updateCustomerWalletDto: UpdateCustomerWalletDto) {
    return `This action updates a #${id} customerWallet`;
  }

  remove(id: number) {
    return `This action removes a #${id} customerWallet`;
  }
}
