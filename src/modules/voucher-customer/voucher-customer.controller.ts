import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VoucherCustomerService } from './voucher-customer.service';
import { CreateVoucherCustomerDto } from './dto/create-voucher-customer.dto';
import { UpdateVoucherCustomerDto } from './dto/update-voucher-customer.dto';

@Controller('voucher-customer')
export class VoucherCustomerController {
  constructor(private readonly voucherCustomerService: VoucherCustomerService) {}

  @Post()
  create(@Body() createVoucherCustomerDto: CreateVoucherCustomerDto) {
    return this.voucherCustomerService.create(createVoucherCustomerDto);
  }

  @Get()
  findAll() {
    return this.voucherCustomerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.voucherCustomerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVoucherCustomerDto: UpdateVoucherCustomerDto) {
    return this.voucherCustomerService.update(+id, updateVoucherCustomerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.voucherCustomerService.remove(+id);
  }
}
