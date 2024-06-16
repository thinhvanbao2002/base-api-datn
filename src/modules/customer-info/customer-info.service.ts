import { Injectable } from '@nestjs/common';
import { CreateCustomerInfoDto } from './dto/create-customer-info.dto';
import { UpdateCustomerInfoDto } from './dto/update-customer-info.dto';

@Injectable()
export class CustomerInfoService {
  create(createCustomerInfoDto: CreateCustomerInfoDto) {
    return 'This action adds a new customerInfo';
  }

  findAll() {
    return `This action returns all customerInfo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} customerInfo`;
  }

  update(id: number, updateCustomerInfoDto: UpdateCustomerInfoDto) {
    return `This action updates a #${id} customerInfo`;
  }

  remove(id: number) {
    return `This action removes a #${id} customerInfo`;
  }
}
