import { Module } from '@nestjs/common';
import { CustomerInfoService } from './customer-info.service';
import { CustomerInfoController } from './customer-info.controller';

@Module({
  controllers: [CustomerInfoController],
  providers: [CustomerInfoService],
})
export class CustomerInfoModule {}
