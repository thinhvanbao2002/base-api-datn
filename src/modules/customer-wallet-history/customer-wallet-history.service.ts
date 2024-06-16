import { Injectable } from '@nestjs/common';
import { CreateCustomerWalletHistoryDto } from './dto/create-customer-wallet-history.dto';
import { UpdateCustomerWalletHistoryDto } from './dto/update-customer-wallet-history.dto';

@Injectable()
export class CustomerWalletHistoryService {
  create(createCustomerWalletHistoryDto: CreateCustomerWalletHistoryDto) {
    return 'This action adds a new customerWalletHistory';
  }

  findAll() {
    return `This action returns all customerWalletHistory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} customerWalletHistory`;
  }

  update(id: number, updateCustomerWalletHistoryDto: UpdateCustomerWalletHistoryDto) {
    return `This action updates a #${id} customerWalletHistory`;
  }

  remove(id: number) {
    return `This action removes a #${id} customerWalletHistory`;
  }
}
