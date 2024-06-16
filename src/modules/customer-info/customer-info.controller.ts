import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CustomerInfoService } from './customer-info.service';
import { CreateCustomerInfoDto } from './dto/create-customer-info.dto';
import { UpdateCustomerInfoDto } from './dto/update-customer-info.dto';

@Controller('customer-info')
export class CustomerInfoController {
  constructor(private readonly customerInfoService: CustomerInfoService) {}

  @Post()
  create(@Body() createCustomerInfoDto: CreateCustomerInfoDto) {
    return this.customerInfoService.create(createCustomerInfoDto);
  }

  @Get()
  findAll() {
    return this.customerInfoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerInfoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCustomerInfoDto: UpdateCustomerInfoDto) {
    return this.customerInfoService.update(+id, updateCustomerInfoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerInfoService.remove(+id);
  }
}
