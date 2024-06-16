import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CustomerWalletService } from './customer-wallet.service';
import { CreateCustomerWalletDto } from './dto/create-customer-wallet.dto';
import { UpdateCustomerWalletDto } from './dto/update-customer-wallet.dto';

@Controller('customer-wallet')
export class CustomerWalletController {
  constructor(private readonly customerWalletService: CustomerWalletService) {}

  @Post()
  create(@Body() createCustomerWalletDto: CreateCustomerWalletDto) {
    return this.customerWalletService.create(createCustomerWalletDto);
  }

  @Get()
  findAll() {
    return this.customerWalletService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerWalletService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCustomerWalletDto: UpdateCustomerWalletDto) {
    return this.customerWalletService.update(+id, updateCustomerWalletDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerWalletService.remove(+id);
  }
}
