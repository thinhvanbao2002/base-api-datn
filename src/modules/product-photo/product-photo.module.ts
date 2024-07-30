import { Module } from '@nestjs/common';
import { ProductPhotoService } from './product-photo.service';
import { ProductPhotoController } from './product-photo.controller';

@Module({
  controllers: [ProductPhotoController],
  providers: [ProductPhotoService],
})
export class ProductPhotoModule {}
