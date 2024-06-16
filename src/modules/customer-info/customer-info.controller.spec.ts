import { Test, TestingModule } from '@nestjs/testing';
import { CustomerInfoController } from './customer-info.controller';
import { CustomerInfoService } from './customer-info.service';

describe('CustomerInfoController', () => {
  let controller: CustomerInfoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerInfoController],
      providers: [CustomerInfoService],
    }).compile();

    controller = module.get<CustomerInfoController>(CustomerInfoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
