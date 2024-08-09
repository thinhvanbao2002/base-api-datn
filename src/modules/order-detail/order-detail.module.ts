import { Module } from "@nestjs/common";
import { OrderDetailService } from "./order-detail.service";
import { OrderDetailController } from "./order-detail.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { OrderModel } from "./model/order-detail.model";

@Module({
	imports: [SequelizeModule.forFeature([OrderModel])],
	controllers: [OrderDetailController],
	providers: [OrderDetailService],
})
export class OrderDetailModule {}
